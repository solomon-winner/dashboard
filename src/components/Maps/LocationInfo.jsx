import React from "react";

export const Default = () => {
  return(
    <div className="d-flex min-w-80">
    <div className="w-50" style={{ border: '1px solid gray' }}>
      <div className="container project-container">
        <div className="card">
        <div className="bg-gray-200 border-gray-400">
            <p className="text-lg font-bold ml-5 py-3">Detailed location Information</p>
          </div>
          <div className="card-body px-4">
            <p>Select a region to view detailed location information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LocationInfo = () => {
  return(
    <div className="d-flex min-w-80">
    <div className="w-50" style={{ border: '1px solid gray' }}>
      <div className="container project-container">
        <div className="card">
          <div className="bg-gray-200 border-gray-400">
            <p className="text-lg font-bold ml-5 py-3">Detailed location Information</p>
          </div>
          <div className="card-body" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>

            </div>
            </div>
            </div>
            </div>
            </div>
  )
}