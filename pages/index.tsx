import type { User } from "../interfaces";
import useSwr from "swr";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>("/api/users", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Paper elevation={3}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        width="100%"
        disableGutters
        ml={0}
        pt="5vh"
        pb="5vh"
      >
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={6}>
            <Link href="/SignIn">
              <Button variant="contained" size="large" sx={{ width: "100%" }}>
                Sign In
              </Button>
            </Link>
          </Grid>
        </Grid>
        {data.map((user) => (
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={6}>
              <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                <Button variant="contained" sx={{ width: "100%" }}>
                  {user.name ?? `User ${user.id}`}
                </Button>
              </Link>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
