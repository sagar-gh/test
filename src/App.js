import React, { Suspense, lazy } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { Redirect, Route, Switch } from "react-router-dom";
import * as path from "./config/pathname";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

const Login = lazy(() => import("./components/login"));
const DataTable = lazy(() => import("./components/dataTable"));

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            displayName: snapShot.data().displayName,
            email: snapShot.data().email,
          });
        });
      } else setCurrentUser(userAuth);
    });
    return () => unsubscribeFromAuth();
  });
  return (
    <div className="App">
      <main>
        <Suspense fallback={<p>Loading ...</p>}>
          <Switch>
            <Route path={path.loginPathname} render={(props) => (currentUser ? <Redirect to={path.mountPoint} /> : <Login />)} />
            <ProtectedRoute path={path.tablePathname} currentUser={currentUser} component={DataTable} />
            <Redirect from={path.mountPoint} to={path.tablePathname} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
