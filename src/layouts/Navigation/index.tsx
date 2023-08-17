import { NavLink } from "react-router-dom";
import View from "../../motion/View";
import IonIcon from "@reacticons/ionicons";

const Navigation = () => {
  return (
    <View className="fixed bottom-0 p-2  z-50  w-full left-0">
      <View className=" px-4 flex items-center duration-200  justify-between rounded-lg border shadow-md bg-white border-gray-200">
        <NavLink
          to="/"
          className={(nav) =>
            nav.isActive
              ? "background-gradient shadow-md border-2 duration-200 border-white w-[3rem] translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    "
              : "rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]"
          }
        >
          <IonIcon name="home-outline" className="text-2xl " />
        </NavLink>
        <NavLink
          to="/meeting"
          className={(nav) =>
            nav.isActive
              ? "background-gradient w-[3rem] shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    "
              : "rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]"
          }
        >
          <IonIcon name="videocam-outline" className="text-2xl " />
        </NavLink>
        <NavLink
          to="/c"
          className={(nav) =>
            nav.isActive
              ? "background-gradient w-[3rem] shadow-md border-2 border-white  duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    "
              : "rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]"
          }
        >
          <IonIcon name="body" className="text-2xl " />
        </NavLink>
        <NavLink
          to="/about"
          className={(nav) =>
            nav.isActive
              ? "background-gradient w-[3rem]  shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    "
              : "rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]"
          }
        >
          <IonIcon name="help-outline" className="text-2xl " />
        </NavLink>
        <NavLink
          to="/c"
          className={(nav) =>
            nav.isActive
              ? "background-gradient w-[3rem] shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    "
              : "rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]"
          }
        >
          <IonIcon name="body" className="text-2xl " />
        </NavLink>
      </View>
    </View>
  );
};

export default Navigation;
