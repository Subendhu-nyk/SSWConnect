
import { lazy } from "react";

const Dashboard = lazy( () =>{
    // import ( './Dashboard')
})

const Home = lazy( () =>{
    // import ( './Home')
})



//add all import components here

// create route config here

const routesConfig = [
    {
        path: '/Dashboard',
        component: Dashboard,
        requiredPermission : ['Dashboard'],

    },
    {
        path: '/',
        component: Home,
        requiredPermission : ['Home'],
        
    },
    // add more routes here
]


export default routesConfig;


