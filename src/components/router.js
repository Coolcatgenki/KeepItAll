import Header from "./header"
import Footer from "./footer"
import Home from "./home"
import ListV1 from "./App1"
import ListV2 from "./App2"
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import { useIsAuthenticated} from "react-auth-kit";

export default function Router(){
    const Layout= () =>{
        return(
            <>
            <Header/>
            <div className="wrapper"><Outlet/></div>
            <Footer/>
            </>
        )
    }
    
    const GoodBrowserRoutes= () =>{
        const x=useIsAuthenticated();
        if(x()===true){
            return( 
              
                <Routes>
                  <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/ListV1" element={<ListV1/>}/>
                    <Route path="/ListV2" element={<ListV2/>}/>
                   </Route>
                </Routes>
              
        )
            
        }
        else{
            return( 
                
                <Routes>
                  <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                   </Route>
                </Routes>

            )
        } 
    }
    return <GoodBrowserRoutes/>
}
