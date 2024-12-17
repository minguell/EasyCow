CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_nascimento DATE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    saldo DECIMAL(10,2) NOT NULL DEFAULT 0,
    foto VARCHAR(255) NOT NULL,
    UNIQUE(nome)
);

CREATE TABLE lotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    anunciante VARCHAR(100) NOT NULL,  
    indice_qualidade FLOAT NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    disponivel INT NOT NULL DEFAULT 2, 
    FOREIGN KEY (anunciante) REFERENCES usuarios(nome) 
);


CREATE TABLE gift_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    usado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    lote INT NOT NULL,
    data_compra DATE NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuarios(nome),
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


INSERT INTO lotes (valor, indice_qualidade, anunciante, cidade, descricao, disponivel, imagem)
VALUES
    (50000.00, 2.5, 'Maria Antonieta', 'Florianópolis', '10 cabeças de gado disponíveis para compra em Florianópolis, SC', 1, '/assets/Lotes/Gado1.jpg'),
    (300000.00, 4.5, 'Ana Julia', 'Vacaria', '50 cabeças de gado em ótimo estado para compra em Vacaria, RS', 1, '/assets/Lotes/Gado2.jpg'),
    (45000.00, 4.5, 'Meryl Streep', 'Viamão', '8 cabeças de gado magro e dois bezerros disponíveis para compra em Viamão, RS', 1, '/assets/Lotes/Gado3.jpg'),
    (5000.00, 5.0, 'Luciana', 'Santa Cruz do Sul', 'Cabeça de gado única disponível para compra em Santa Cruz do Sul, RS', 1, '/assets/Lotes/Gado4.jpg'),
    (80000.00, 4.0, 'Angelo Oliveira', 'Canasvieiras', '15 cabeças de gado disponíveis para compra em Canasvieiras, SC', 1, '/assets/Lotes/Gado5.jpg'),
    (55000.00, 5.0, 'Miguel Dutra', 'Garopaba', '10 cabeças de gado disponíveis para compra em Garopaba, SC', 1, '/assets/Lotes/Gado6.jpg'),
    (15000.00, 3.5, 'Bruno Hofstetter', 'Gramado', '3 cabeças de gado magro disponíveis para compra em Gramado, RS', 1, '/assets/Lotes/Gado7.jpg'),
    (20000.00, 4.5, 'Nathan Mattes', 'Nova Petrópolis', '1 boi reprodutor disponível para compra em Nova Petrópolis, RS', 2, '/assets/Lotes/Gado8.jpg'),
    (50000.00, 4.0, 'Augusto Grohmann', 'Bagé', '2 bois reprodutores disponíveis para compra em Bagé, RS', 0, '/assets/Lotes/Gado9.jpg');

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
    ('BBBB-BBBB', 15000.00, FALSE),
    ('QWER-ASDF', 30000.00, FALSE),
    ('ZXCV-RTYU', 45000.00, FALSE),
    ('PLMN-OPQR', 120000.00, FALSE),
    ('TYUI-WXYZ', 35000.00, FALSE),
    ('HJKL-MNOP', 25000.00, FALSE),
    ('VBNM-QWERT', 50000.00, FALSE),
    ('ASDF-GHJK', 70000.00, FALSE),
    ('ZERT-XCVB', 80000.00, FALSE),
    ('FGHI-JKL0', 55000.00, FALSE),
    ('MNBV-ASDF', 22000.00, FALSE),
    ('WXYZ-LKJI', 60000.00, FALSE),
    ('TYUI-POIU', 95000.00, FALSE),
    ('MNOP-QWED', 40000.00, FALSE),
    ('BNML-OKJU', 12000.00, FALSE),
    ('LKJI-HGFE', 85000.00, FALSE),
    ('ASDF-MNBV', 63000.00, FALSE),
    ('QWERT-ASDF', 15000.00, FALSE),
    ('ZXCV-POIU', 23000.00, FALSE),
    ('TYUI-LKJI', 92000.00, FALSE),
    ('KLMN-VBXC', 75000.00, FALSE),
    ('QWER-QWER', 47000.00, FALSE),
    ('ZXCV-ABCD', 55000.00, FALSE),
    ('PLMN-KLJU', 60000.00, FALSE),
    ('ASDF-PLOP', 32000.00, FALSE),
    ('GHJK-QWEQ', 49000.00, FALSE),
    ('VBNM-RTYU', 28000.00, FALSE),
    ('TYUI-QWOP', 110000.00, FALSE),
    ('MNBV-CVZX', 72000.00, FALSE),
    ('FGHI-JKLO', 85000.00, FALSE),
    ('ZERT-PLOI', 100000.00, FALSE),
    ('WXYZ-HGFE', 55000.00, FALSE),
    ('PLMN-NBVC', 80000.00, FALSE),
    ('BVCX-ASDF', 92000.00, FALSE),
    ('QWOT-PAWS', 25000.00, FALSE),
    ('ZXCV-MNBV', 12000.00, FALSE),
    ('FGHI-RTYU', 45000.00, FALSE),
    ('KLMN-POIU', 54000.00, FALSE),
    ('LMNO-QRST', 95000.00, FALSE),
    ('VBNM-ZXCV', 80000.00, FALSE),
    ('ASDF-JKL0', 30000.00, FALSE),
    ('TYUI-PLMN', 70000.00, FALSE),
    ('MNBV-FGHI', 48000.00, FALSE),
    ('QWET-PLKO', 60000.00, FALSE),
    ('ZRTY-WQPV', 80000.00, FALSE),
    ('XCVB-ASDF', 15000.00, FALSE),
    ('BVCX-OKIU', 95000.00, FALSE),
    ('PLMN-QWER', 64000.00, FALSE),
    ('TYUI-POIU', 24000.00, FALSE),
    ('LKJI-VBNM', 110000.00, FALSE),
    ('MNOP-ASDF', 50000.00, FALSE),
    ('GHJK-PLOP', 35000.00, FALSE),
    ('ZERT-QWOP', 80000.00, FALSE);
    
INSERT INTO compras (usuario, lote, data_compra)
VALUES
    ('Nathan Mattes', 1, '2021-06-01');