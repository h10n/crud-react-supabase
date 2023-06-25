import "./App.css";
import { Routes } from "@/routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import useSession from "./hooks/useSession";

const queryClient = new QueryClient();
function App() {
  const { isLoading } = useSession();

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
