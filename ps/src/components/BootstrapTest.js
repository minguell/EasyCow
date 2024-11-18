import React from 'react';

const BootstrapTest = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Teste do Bootstrap</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">Este é um card de teste do Bootstrap.</p>
              <button className="btn btn-primary">Botão Primário</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 2</h5>
              <p className="card-text">Outro card para testar o layout.</p>
              <button className="btn btn-secondary">Botão Secundário</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 3</h5>
              <p className="card-text">Mais um card para garantir a responsividade.</p>
              <button className="btn btn-success">Botão de Sucesso</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn btn-danger me-2">Danger</button>
        <button className="btn btn-warning me-2">Warning</button>
        <button className="btn btn-info me-2">Info</button>
        <button className="btn btn-light me-2">Light</button>
        <button className="btn btn-dark">Dark</button>
      </div>
      <div className="mt-4">
        <div className="alert alert-primary" role="alert">
          Este é um alerta primário do Bootstrap!
        </div>
      </div>
    </div>
  );
};

export default BootstrapTest;