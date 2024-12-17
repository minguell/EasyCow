CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_nascimento DATE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    saldo DECIMAL(10,2) NOT NULL DEFAULT 0,
    foto VARCHAR(255) NOT NULL
);

CREATE TABLE lotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    anunciante INT NOT NULL,
    indice_qualidade FLOAT NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    FOREIGN KEY (anunciante) REFERENCES usuarios(id)
);

CREATE TABLE gift_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    usado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario INT NOT NULL,
    lote INT NOT NULL,
    data_compra DATE NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuarios(id),
    FOREIGN KEY (lote) REFERENCES lotes(id)
);

INSERT INTO usuarios (nome, data_nascimento, email, senha, saldo, foto)
VALUES
    ('Ana Julia', '2000-01-01', 'ana@email.com', 'senha123', 0.00, '/assets/Usuarios/Ana.png'),
    ('Angelo Oliveira', '2000-01-01', 'angelo@email.com', 'senha123', 0.00, '/assets/Usuarios/Angelo.png'),
    ('Augusto Grohmann', '2000-01-01', 'augusto@email.com', 'senha123', 0.00, '/assets/Usuarios/Augusto.png'),
    ('Bruno Hofstetter', '2000-01-01', 'bruno@email.com', 'senha123', 0.00, '/assets/Usuarios/Bruno.png'),
    ('Luciana', '2000-01-01', 'luciana@email.com', 'senha123', 0.00, '/assets/Usuarios/Luciana.png'),
    ('Maria Antonieta', '2000-01-01', 'maria@email.com', 'senha123', 0.00, '/assets/Usuarios/Maria.png'),
    ('Meryl Streep', '2000-01-01', 'meryl@email.com', 'senha123', 0.00, '/assets/Usuarios/Meryl.png'),
    ('Miguel Dutra', '2000-01-01', 'miguel@email.com', 'senha123', 0.00, '/assets/Usuarios/Miguel.png'),
    ('Nathan Mattes', '2000-01-01', 'nathan@email.com', 'senha123', 10.00, '/assets/Usuarios/Nathan.png');


INSERT INTO lotes (valor, indice_qualidade, anunciante, cidade, descricao, imagem)
VALUES
    (50000.00, 2.5, (SELECT id FROM usuarios WHERE nome = 'Maria Antonieta'), 'Florianópolis', '10 cabeças de gado disponíveis para compra em Florianópolis, SC', '../assets/Lotes/Gado1.jpg'),
    (300000.00, 4.5, (SELECT id FROM usuarios WHERE nome = 'Ana Julia'), 'Vacaria', '50 cabeças de gado em ótimo estado para compra em Vacaria, RS', '../assets/Lotes/Gado2.jpg'),
    (45000.00, 4.5, (SELECT id FROM usuarios WHERE nome = 'Meryl Streep'), 'Viamão', '8 cabeças de gado magro e dois bezerros disponíveis para compra em Viamão, RS', '../assets/Lotes/Gado3.jpg'),
    (5000.00, 5.0, (SELECT id FROM usuarios WHERE nome = 'Luciana'), 'Santa Cruz do Sul', 'Cabeça de gado única disponível para compra em Santa Cruz do Sul, RS', '../assets/Lotes/Gado4.jpg'),
    (80000.00, 4.0, (SELECT id FROM usuarios WHERE nome = 'Angelo Oliveira'), 'Canasvieiras', '15 cabeças de gado disponíveis para compra em Canasvieiras, SC', '../assets/Lotes/Gado5.jpg'),
    (55000.00, 5.0, (SELECT id FROM usuarios WHERE nome = 'Miguel Dutra'), 'Garopaba', '10 cabeças de gado disponíveis para compra em Garopaba, SC', '../assets/Lotes/Gado6.jpg'),
    (15000.00, 3.5, (SELECT id FROM usuarios WHERE nome = 'Bruno Hofstetter'), 'Gramado', '3 cabeças de gado magro disponíveis para compra em Gramado, RS', '../assets/Lotes/Gado7.jpg'),
    (20000.00, 4.5, (SELECT id FROM usuarios WHERE nome = 'Nathan Mattes'), 'Nova Petrópolis', '1 boi reprodutor disponível para compra em Nova Petrópolis, RS', '../assets/Lotes/Gado8.jpg'),
    (50000.00, 4.0, (SELECT id FROM usuarios WHERE nome = 'Augusto Grohmann'), 'Bagé', '2 bois reprodutores disponíveis para compra em Bagé, RS', '../assets/Lotes/Gado9.jpg');

INSERT INTO gift_cards (codigo, valor, usado)
VALUES
    ('ABCD-EFGH', 50000.00, FALSE),
    ('AAAA-BBBB', 20000.00, FALSE),
    ('LULU-LULU', 120000.00, FALSE),
    ('JAJA-JAJA', 40000.00, FALSE),
    ('AAAA-AAAA', 55000.00, FALSE),
    ('MAMA-MAMA', 65000.00, FALSE),
    ('BABA-BABA', 10000.00, FALSE),
    ('ZZZZ-ZZZZ', 80000.00, FALSE),
    ('BBBB-CCCC', 9500.00, FALSE),
    ('KKKK-KKKK', 100000.00, FALSE),
    ('BBBB-BBBB', 15000.00, FALSE);