import React from "react"

function ProjectCard({ image, title, text, gitEndPoint, QRCode }) {
  return (
    <div className="card shadow h-100">
      <img src={image} className="card-img-top" alt={`A ${title} project snapshot`} />
      <div className="card-body d-md-flex flex-md-column">
        <h5 className="card-title mb-3">{title}</h5>
        <p className="card-text">{text}</p>
        <div className="mt-md-auto">
          <a
            href={`https://github.com/dowely/${gitEndPoint}`}
            className="btn btn-primary"
            target="_blank"
          >
            {"Code < />"}
          </a>
          <div className="btn-group ms-3" role="group">
            <a
              href={`https://dowely.github.io/${gitEndPoint}`}
              className="btn btn-primary"
              target="_blank"
            >
              Demo
            </a>
            <button
              type="button"
              className="btn btn-primary border border-light border-opacity-25 border-top-0 border-end-0 border-bottom-0"
              data-bs-toggle="dropdown"
              style={{
                "border-top-right-radius": ".375rem",
                "border-bottom-right-radius": ".375rem"
              }}
            >
              &#9660;
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <h6>View it on mobile</h6>
                <div>
                  <img src={QRCode} alt="Space travel website QR link" className="img-fluid" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
