import {
  // Form,
  Links,
  Meta,
  //NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  // useLoaderData,
  // useNavigation,
  // useRouteError,
  // useSubmit,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { HelmetProvider } from 'react-helmet-async';

// import { json } from "@remix-run/node";
// import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
// import { createEmptyContact, getContacts } from "./data";
// import appStylesHref from "./app.scss?url";
// import * as React from "react";
// import Hero from "./ui/Hero/Hero";
// import Navbar from "./ui/Navbar/Navbar";
// import ContentContainer from "./ui/ContentContainer/ContentContainer";
// import GridItem from "./ui/Grid/GridItem";
// import GridContainer from "./ui/Grid/Grid";
// import Box from "./ui/Box/Box";

import { LinksFunction } from "@remix-run/node";
import styles from "./app.scss?url";
import { ThemeProvider } from "./context/ThemeContext";
import { I18nProvider } from "./context/i18nContext";
import Snackbar from "./ui/Snackbar/Snackbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <title>Real Estate Agency - Encuentra tu lugar ideal.</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <ThemeProvider>
              <Outlet />
              <Snackbar />
              <ScrollRestoration />
              <Scripts />
            </ThemeProvider>
          </I18nProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: appStylesHref },
// ];

// export const action = async () => {
//   const contact = await createEmptyContact();
//   return json({ contact });
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const contacts = await getContacts(q);
//   return json({ contacts, q });
// };

// export default function App() {
//   const { contacts, q } = useLoaderData<typeof loader>();
//   const navigation = useNavigation();
//   const [query, setQuery] = React.useState(q || "");

//   const error = useRouteError();
//   console.error(error);
//   React.useEffect(() => {
//     setQuery(q || "");
//   }, [q]);

//   const submit = useSubmit();

//   const searching =
//     navigation.location &&
//     new URLSearchParams(navigation.location.search).has("q");

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body className="index-page">
//         <div>
//           <Navbar />
//           <Hero />

//         </div>
//         <div>
//           <Outlet />
//         </div>
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

// <div
// id="sidebar"
// className={navigation.state === "loading" ? "loading" : ""}
// >
// <h1>Remix Contacts</h1>
// <div>
//  <Form
//     id="search-form"
//     onChange={(event) =>{
//       const isFirstSearch = q === null;
//       submit(event.currentTarget, {
//         replace: !isFirstSearch,
//       });
//     }}
//     role="search"
//   >
//     <input
//       id="q"
//       className={
//         navigation.state === "loading" && !searching ? "loading" : ""
//       }
//       value={query ?? ''}
//       aria-label="Search contacts"
//       placeholder="Search"
//       type="search"
//       name="q"
//       onChange={(event) => {
//         setQuery(event.currentTarget.value)
//       }}
//     />
//     <div aria-hidden hidden={!searching} id="search-spinner" />
//     <div id="search-spinner" aria-hidden hidden={true} />
//   </Form>
//   <Form method="post">
//     <button type="submit">New</button>
//   </Form>
// </div>
// <nav>
//   <ul>
//     {sortBy(contacts, ['first']).map((item) => (
//       // TO GENERATE A FULL RELOAD OF THE PAGE
//       // <li key={item.id}>
//       //   <a href={`/contacts/${item.id}`}>
//       //     {item.first} {item.last}
//       //   </a>
//       // </li>
//       <li key={item.id}>
//         <NavLink
//           className={({ isActive, isPending }) =>
//             isActive ? "active" : isPending ? "pending" : ""
//           }
//           to={`contacts/${item.id}`}
//         >
//           {item.first && item.last ? (
//             `${item.first} ${item.last}`
//           ) : (
//             <i>No name</i>
//           )}
//         </NavLink>
//       </li>
//     ))}
//   </ul>
// </nav>
// </div>
