import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HardDrive } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const History = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/api/history`).then((res) => setData(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <div className="flex justify-between shadow-[0_3px_10px_rgb(0,0,0,0.1)] items-center px-8 py-3 bg-white">
        <div className="flex items-center">

        <HardDrive className="w-8 h-8 p-1 rounded bg-black flex items-center justify-center text-white" />
        <h1 onClick={() => navigate("/")} className="font-semibold cursor-pointer ml-2 text-l">Disk Scheduling Visualizer</h1>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-15 sm:w-25 cursor-pointer bg-black text-white py-2 rounded-md text-sm"
        >
          Back
        </button>
      </div>

      {/* CENTER CONTAINER */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl text-center font-bold mb-6">History</h1>

        {data.length === 0 ? (
          <p className="text-gray-400">No data yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div key={item._id} className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4">
                <p className="font-medium">{item.algorithm}</p>

                <p className="text-sm text-gray-600 mt-1">
                  {item.requests.join(", ")}
                </p>

                <p className="text-sm text-green-600 mt-1">
                  Seek Time: {item.seekTime}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
