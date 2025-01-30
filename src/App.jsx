import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicNav from "./Shared/BasicNav";
import Home from "./component/Home";
import NotFound from "./Shared/NotFound";
import Users from "./component/Users";
import RQUsers from "./component/RQUsers";
import {QueryClientProvider, QueryClient} from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import RQUsers2 from "./component/RQUsers2";
import UserDetails from "./component/UserDetails";
import RQUsers3 from "./component/RQUsers3";
import ParallelQuery from "./component/ParallelQuery";
import DependentQuery from "./component/DependentQuery";
import InitialQueryData from "./component/InitialQueryData";
import AnimalsDetails from "./component/AnimalsDetails";
import PaginationQuery from "./component/PaginationQuery";
import InfiniteQuery from "./component/InfiniteQuery";
import RQAddUser from "./component/RQAddUser";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BasicNav></BasicNav>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/users" element={<Users></Users>}></Route>
              <Route path="/rqusers" element={<RQUsers></RQUsers>}></Route>
              <Route path="/rqusers2" element={<RQUsers2></RQUsers2>}></Route>
              <Route path="/rqusers3" element={<RQUsers3></RQUsers3>}></Route>
              <Route path="/parallel" element={<ParallelQuery></ParallelQuery>}></Route>
              <Route path="/dependent" element={<DependentQuery userName={"Cosmo"}></DependentQuery>}></Route>
              <Route path="/InitialQueryData" element={<InitialQueryData></InitialQueryData>}></Route>
              <Route path="/userDetails/:id" element={<UserDetails></UserDetails>}></Route>
              <Route path="/animalDetails/:id" element={<AnimalsDetails></AnimalsDetails>}></Route>
              <Route path="/colors" element={<PaginationQuery></PaginationQuery>}></Route>
              <Route path="/InfiniteQuery" element={<InfiniteQuery></InfiniteQuery>}></Route>
              <Route path="/AddUser" element={<RQAddUser></RQAddUser>}></Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  )
}

export default App
