import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicNav from "./Shared/BasicNav";
import Home from "./component/Home";
import NotFound from "./Shared/NotFound";
import Users from "./component/Users";
import RQUsers from "./component/RQUsers";
import {QueryClientProvider, QueryClient} from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

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
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  )
}

export default App
