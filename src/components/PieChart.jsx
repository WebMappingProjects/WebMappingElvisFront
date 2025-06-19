import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data, labels, colors }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
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

  // Vérifier si le tableau de données est vide ou ne contient que des valeurs nulles/0
  const hasData = Array.isArray(data) && data.some((value) => value > 0);

  if (!hasData) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
        Aucune donnée à afficher pour le graphique circulaire.
      </div>
    );
  }

  return <canvas ref={canvasRef} style={{ maxWidth: 400, maxHeight: 400 }} />;
};

export default PieChart;
