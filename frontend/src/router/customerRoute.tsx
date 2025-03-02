import { getSession } from "@/lib/utils";
import CustomerBrowseGenre from "@/pages/CustomerBrowseGenre";
// import CustomerBrowseGenre from "@/pages/CustomerBrowseGenre";
import CustomerHome from "@/pages/CustomerHome";
import CustomerMovieDetail from "@/pages/CustomerMovieDetail";
import CustomerOrder from "@/pages/CustomerOrder";
import CustomerOrderDetail from "@/pages/CustomerOrderDetail";
import CustomerSetting from "@/pages/CustomerSetting";
import CustomerSignIn from "@/pages/CustomerSignIn";
import CustomerSignUp from "@/pages/customerSignUp";
import CustomerTransaction from "@/pages/CustomerTransaction";
import CustomerTransactionSuccess from "@/pages/CustomerTransactionSuccess";
import CustomerWallet from "@/pages/CustomerWallet";
import CustomerWalletTopup from "@/pages/CustomerWalletTopup";
import CustomerWalletTopupSuccess from "@/pages/CustomerWalletTopupSuccess";
import { getDetailMovie, getGenres, getMovies } from "@/services/global/global.service";
import { getOrder, getOrderDetail } from "@/services/order/order.service";
import { getTheaters } from "@/services/theaters/theaters.service";
import { redirect, RouteObject } from "react-router-dom";

const customerRoute: RouteObject[] = [
    {
        path:'/sign-up',
        element:<CustomerSignUp/>
    },
    {
        path:'/sign-in',
        element:<CustomerSignIn/>
    },
    {
        path:'/',
        loader:async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            const movies = await getMovies()

            const genres = await getGenres()

            return ({
                movies:movies.data,
                genres:genres.data
            })

        },
        element:<CustomerHome/>
    },
    {
        path: "/browse/:genreId",
        loader:async({params})=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            if(!params.genreId){
                throw redirect('/')
            }

            const genres = await getGenres()
            const theaters = await getTheaters("customer")

            return{
                genres:genres.data,
                theaters:theaters.data
            }
        },
        element: <CustomerBrowseGenre />
    },
    {
        path: "/movie/:movieId",
        loader:async({params})=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            if(!params.movieId){
                throw redirect('/')
            }

            const movieDetail = await getDetailMovie(params.movieId)

            return {
                detail:movieDetail.data.movie
            }
        },
        element:<CustomerMovieDetail/>
    },
    {
        path: "/transaction-ticket",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerTransaction/>
    },
    {
        path:"transaction-ticket/success",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerTransactionSuccess/>
    },
    {
        path:"/wallet",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerWallet/>
    },
    {
        path:"/wallet/topup",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerWalletTopup/>
    },
    {
        path:"/wallet/topup/success",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerWalletTopupSuccess/>
    },
    {
        path:"/orders",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            const order = await getOrder()

            return order.data
        },
        element:<CustomerOrder/>
    },
    {
        path:'/orders/:orderId',
        loader: async({params})=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            if(!params.orderId){
                throw redirect('/orders')
            }

            const orderDetail = await getOrderDetail(params.orderId)

            return orderDetail.data 
        },
        element:<CustomerOrderDetail/>
    },
    {
        path:"/settings",
        loader: async()=>{
            const user = getSession()
            
            if(!user || user?.role !== 'customer'){
                throw redirect('/sign-in')
            }

            return true
        },
        element:<CustomerSetting/>
    }
]

export default customerRoute;