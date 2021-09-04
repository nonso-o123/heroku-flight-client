import React, { useEffect, Fragment } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from '../pages/Home'
import Information from '../pages/Information';
import FeaturedAirlines from '../pages/FeaturedAirlines';
import FeaturedDestination from '../pages/FeaturedDestination';
import { fetchCities } from '../redux/actionCreators/CitiesActionCreators';
import { fetchAirlines } from '../redux/actionCreators/AirlinesActionCreators'

import Dashboard from "../pages/dashboard/dashboardNav/Dashboard";
import Logout from "../components/Logout/Logout";


function Main({ modalOpen, setModalOpen, userInfo, userReg }) {
  /*********************************************STATE */
  const dispatch = useDispatch()

  const data = useSelector(state => state.cities)
  const { cities, isLoading, errMess } = data

  const airlinesData = useSelector(state => state.airlines)
  const { airlines, airlinesLoading, errorMess } = airlinesData


  /*********************************************CUSEEFFECT */
  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchAirlines())
  }, [])
  /************************************************Return */

  return (
    isLoading || airlinesLoading ? <div>loading...</div> :
      errMess || errorMess ? <div>{errMess}</div> :
        <Fragment>
          <main className="main">
            <Switch>
              <Route exact={true} path="/"
                render={props => (<Home {...props}
                  cities={cities}
                  airlines={airlines}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  userInfo={userInfo}
                  userReg={userReg} />)}
              />
              <Route exact={true} path="/profile"
                render={props => (<Home {...props}
                  cities={cities}
                  airlines={airlines}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen} />)}
              />

              <Route exact={true} path="/information"
                render={props => (<Information {...props}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  userInfo={userInfo}
                  userReg={userReg} />)}
              />

              <Route exact={true} path="/airlines/:slug"
                render={props => (<FeaturedAirlines {...props}
                  airlines={airlines}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen} />)}
              />

              <Route exact={true} path="/destination/:slug"
                render={props => (<FeaturedDestination {...props}
                  cities={cities}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen} />)}
              />

              <Route exact={true} path="/dashboard"
                render={props => (<Dashboard {...props} />)}
              />

              <Route exact={true} path="/logout" component={Logout} />

              <Route component={Error} />
            </Switch>
          </main>

        </Fragment>
  )
}

export default withRouter(Main)