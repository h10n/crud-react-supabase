import { useState } from "react";

import {
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";

import {
  BarChart,
  ChevronLeft,
  Dashboard,
  ExpandLess,
  ExpandMore,
  MoveDown,
  Storage,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = ({ toggleDrawer, open }) => {
  const [isExpandMenu, setIsExpandMenu] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsExpandMenu(!isExpandMenu);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MoveDown />
          </ListItemIcon>
          <ListItemText primary="Transaction" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="Master Data" />
          {isExpandMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isExpandMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={true}
              onClick={() => navigate("/users")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
export default Sidebar;
