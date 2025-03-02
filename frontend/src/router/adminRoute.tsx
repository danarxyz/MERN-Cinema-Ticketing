import { redirect, RouteObject } from "react-router-dom";
import AdminLogin from "@/pages/AdminLoginPage/loginPage";
import { AdminOverview } from "@/pages/AdminOverview/AdminOverview";
import AdminLayout from "@/components/AdminLayout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/AdminGenre";
import { getGenreDetail, getGenres } from "@/services/genre/genre.service";
import AdminGenreForm from "@/pages/AdminGenre/form";
import AdminTheaters from "@/pages/AdminTheater/AdminTheaters";
import {
  getTheaterDetail,
  getTheaters,
} from "@/services/theaters/theaters.service";
import AdminTheaterForm from "@/pages/AdminTheater/form";
import AdminMovie from "@/pages/Admin Movie";
import { getMovieDetail, getMovies } from "@/services/movies/movie.service";
import AdminMovieForm from "@/pages/Admin Movie/form";
import AdminCustomer from "@/pages/Admin Customer";
import { getCustomers, getTransaction, getWalletTransaction } from "@/services/customer/customer.service";
import AdminTransaction from "@/pages/Admin Transactions";
import AdminWalletTransaction from "@/pages/Admin Wallet Transaction";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: () => {
      const user = getSession();
      if (!user || user?.role !== "admin") {
        throw redirect("/admin/login");
      }

      return user;
    },
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
      // GENRE
      {
        path: "/admin/genres",
        loader: async () => {
          const genres = await getGenres();
          return genres.data;
        },
        element: <AdminGenre />,
      },
      {
        path: "/admin/genres/create",
        element: <AdminGenreForm />,
      },
      {
        path: "/admin/genres/edit/:id",
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/genres");
          }

          const detail = await getGenreDetail(params.id);
          return detail.data;
        },
        element: <AdminGenreForm />,
      },
      // THEATER
      {
        path: "/admin/theaters",
        loader: async () => {
          const theaters = await getTheaters();
          return theaters.data;
        },
        element: <AdminTheaters />,
      },
      {
        path: "/admin/theaters/create",
        element: <AdminTheaterForm />,
      },
      {
        path: "/admin/theaters/edit/:id",
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/theaters");
          }

          const detail = await getTheaterDetail(params.id);
          return detail.data;
        },
        element: <AdminTheaterForm />,
      },
      // MOVIE
      {
        path: "/admin/movies",
        loader: async () => {
          const movies = await getMovies();
          return movies.data;
        },
        element: <AdminMovie />,
      },
      {
        path: "/admin/movies/create",
        loader: async () => {
          const genres = await getGenres();
          const theaters = await getTheaters();
          return { genres: genres.data, theaters: theaters.data, detail: null };
        },
        element: <AdminMovieForm />,
      },
      {
        path: "/admin/movies/edit/:id",
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/movies");
          }
          
          const detail = await getMovieDetail(params.id);
          const genres = await getGenres();
          const theaters = await getTheaters();
          return { detail: detail.data, genres: genres.data, theaters: theaters.data };
        },
        element: <AdminMovieForm />,
      },
      // CUSTOMER
      {
        path: "/admin/customers",
        loader: async () => {
          const customers = await getCustomers();
          return customers.data;
        },
        element: <AdminCustomer />,
      },
      // TICKET TRANSACTIONS
      {
        path: "/admin/ticket-transaction",
        loader: async () => {
          const transactions = await getTransaction();
          return transactions.data;
        },
        element: <AdminTransaction/>,
      },
      // WALLET TRANSACTIONS
      {
        path: "/admin/wallet-transaction",
        loader: async () => {
          const walletTransactions = await getWalletTransaction();
          return walletTransactions.data;
        },
        element: <AdminWalletTransaction/>,
      }
    ],
  },
];

export default adminRoutes;
