import ApartmentIcon from "@mui/icons-material/Apartment";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BuildIcon from "@mui/icons-material/Build";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import WeekendIcon from "@mui/icons-material/Weekend";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { FC, Fragment, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths, RouteType } from "../../../router/routes";
import { Drawer } from "./drawer";

interface ISideBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

const icons: any = {
  home: <HomeIcon />,
  solution: <EmojiObjectsIcon />,
  activity: <SnowshoeingIcon />,
  ambient: <NightsStayIcon />,
  configuration: <MiscellaneousServicesIcon />,
  apartment: <WeekendIcon />,
  build: <BuildIcon />,
  people: <PeopleAltIcon />,
  material: <BorderAllIcon />,
  wall: <ApartmentIcon />,
};

const SideBar: FC<ISideBarProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    toggleDrawer();
    setSubMenuOpen(false);
  };

  const getItems = (paths: RouteType[], styles?: SxProps): ReactNode => {
    return (
      <>
        {paths.map((path: RouteType) =>
          path.extraPaths ? (
            <Fragment key={path.path}>
              <ListItemButton onClick={() => setSubMenuOpen(!subMenuOpen)}>
                <ListItemIcon>{icons[path.path]}</ListItemIcon>
                <ListItemText primary="Inbox" />
                {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {getItems(Object.values(path.extraPaths), { pl: 4 })}
                </List>
              </Collapse>
            </Fragment>
          ) : (
            <ListItemButton
              key={path.path}
              onClick={() => navigate(path.absolutePath)}
              sx={styles}
            >
              <ListItemIcon>{icons[path.path]}</ListItemIcon>
              <ListItemText primary={path.label} />
            </ListItemButton>
          )
        )}
      </>
    );
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
        <IconButton onClick={handleCloseMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {getItems(Object.values(RoutePaths) as RouteType[])}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;
