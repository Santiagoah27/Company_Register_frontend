import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generatePDFContent = (doc, articles) => {
  const columns = [
    { header: "Articulo", dataKey: "name" },
    { header: "Cantidad", dataKey: "quantity" },
  ];

  const rows = articles.map((article) => ({
    name: article.name,
    quantity: article.quantity,
  }));

  doc.autoTable({
    columns,
    body: rows,
  });
};

export const downloadPDF = (articles) => {
  const doc = new jsPDF();
  generatePDFContent(doc, articles);
  doc.save("inventory.pdf");
};

export const generateInventoryPDF = (articles) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      generatePDFContent(doc, articles);

      // Use 'dataurl' instead of 'arraybuffer' and create a Base64 string from the result
      const dataUrl = doc.output("dataurl");
      const base64 = dataUrl.split(",")[1];

      resolve(base64);
    } catch (error) {
      console.error("Error generating the PDF:", error);
      reject(error);
    }
  });
};




