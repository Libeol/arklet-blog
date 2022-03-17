import './App.css';
import React from "react"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import api from "./component/items/api"
import TopA from './component/admin/TopA';
import CreateArticle from './component/admin/CreateArticle';
import EditTagList from './component/admin/EditTagList';
import SettingArticle from './component/admin/SettingArticle';
import Login from './component/signup/Login';
import SignUp from './component/signup/signup';
import TopANotLogin from './component/admin/TopANotLogin';
import SettingAuthor from './component/admin/SettingAuthor';
import Article from './component/pages/article/Article';
import { HashRouter } from 'react-router-dom';
import { Top } from './component/pages';
import { Footer, Header } from './component';

function App() {
  const [id, setId] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /* 認証 */

  useEffect(() => {
    api.get("auth", { withCredentials: true }).then((response) => {
      console.log(response.data)
      if (response.data.auth) {
        setId(response.data.id)
        setIsLoggedIn(true)
      }
    })
  }, [])

  /* ログイン処理 */
  const login = (authorId) => {
    setId(authorId)
    setIsLoggedIn(true)
  }
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path={"/"}>
            <Top />
          </Route>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/login"}>
            <Login login={login} />
          </Route>
          <Route path={"/article/:articleId"}>
            <Article />
          </Route>

          <Route
            path="/admin"
            render={({ match: { url } }) => (
              <>
                {isLoggedIn ?
                  <Switch>
                    <Route exact path={`${url}`}>
                      <TopA />
                    </Route>
                    <Route path={`${url}/createArticle`}>
                      <CreateArticle />
                    </Route>
                    <Route path={`${url}/editTag`}>
                      <EditTagList />
                    </Route>
                    <Route path={`${url}/settingArticle`}>
                      <SettingArticle />
                    </Route>
                    <Route path={`${url}/settingAuthor`}>
                      <SettingAuthor />
                    </Route>

                  </Switch>
                  :
                  <Switch>
                    <Route exact path={`${url}`}>
                      <TopANotLogin />
                    </Route>
                  </Switch>
                }

              </>
            )}
          />
        </Switch>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
