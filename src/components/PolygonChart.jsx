import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PolygonChart = ({ data, labels, colors }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "radar",
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors?.[0] || "rgba(79, 70, 229, 0.2)",
              borderColor: colors?.[1] || "#4F46E5",
              pointBackgroundColor: colors?.[2] || "#4F46E5",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
            },
          },
        },
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels, colors]);

  const hasData = Array.isArray(data) && data.some((value) => value > 0);

  if (!hasData) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
        Aucune donnée à afficher pour le graphique polygonal.
      </div>
    );
  }

  return <canvas ref={canvasRef} style={{ maxWidth: 400, maxHeight: 400 }} />;
};

export default PolygonChart;
