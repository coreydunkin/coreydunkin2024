"use client"

const PrintButton = () => {
  return (
    <div className="print-button">
      <button
        className={`
          border-gray-700
          text-gray-700
          font-medium
          rounded-md
          py-2
          px-4
          border
          mt-5
        `}
        onClick={() => window.print()}>
        Print / PDF
      </button>
    </div>
  );
}

export default PrintButton;