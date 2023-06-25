import { useMatches } from "react-router-dom";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumbs = () => {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match);
  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className="bg-gray-50 px-4 py-3 dark:bg-gray-800"
    >
      <Link
        underline="hover"
        key="1"
        color="inherit"
        href="/"
        onClick={() => {}}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {crumbs.map((crumb, index, arr) => {
        if (index !== arr.length - 1) {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              onClick={() => {}}
              href={crumb.pathname}
            >
              {crumb.handle.crumb}
            </Link>
          );
        }

        return (
          <Typography key={index} color="text.primary">
            {crumb.handle.crumb}
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
