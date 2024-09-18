import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";

const refresh = createRefresh({
  interval: 15 * 60, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/refresh",
        { refreshToken: param.refreshToken },
        {
          headers: { Authorization: `Bearer ${param.authToken}` },
        }
      );
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 15 * 60, // 15 minutes
        newRefreshTokenExpiresIn: 7 * 24 * 60 * 60, // 7 days
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: undefined,
        newAuthTokenExpireIn: undefined,
        newRefreshTokenExpiresIn: undefined,
      };
    }
  },
});

export default refresh;
