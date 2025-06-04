const lanches = [
  { nome: "X-Burger", ingredientes: ["Pão", "Carne", "Queijo"], preco: 12.50, estoque: 10 },
  { nome: "X-Vegano", ingredientes: ["Pão", "Alface", "Tomate"], preco: 18.00, estoque: 8 },
  { nome: "X-Burger Especial", ingredientes: ["Pão", "Carne", "Queijo", "Ovo", "Frango"], preco: 16.50, estoque: 5 },
  { nome: "X-Calabresa", ingredientes: ["Pão", "Calabresa", "Queijo", "Cebola"], preco: 14.00, estoque: 7 },
  { nome: "X-Frango com Catupiry", ingredientes: ["Pão", "Frango", "Catupiry", "Alface"], preco: 15.50, estoque: 9 },
  { nome: "X-Bacon", ingredientes: ["Pão", "Carne", "Bacon", "Queijo"], preco: 17.00, estoque: 6 }
];

let totalVendas = 0;

const lancheListEl = document.getElementById('lanche-list');
const totalVendasEl = document.getElementById('total-vendas');
const btnDesfazerVenda = document.getElementById('btn-desfazer-venda');

let historicoVendas = []; // Guarda histórico para desfazer vendas

function renderLanches() {
  lancheListEl.innerHTML = '';

  lanches.forEach((lanche, index) => {
    const tr = document.createElement('tr');

    const ingredientesStr = lanche.ingredientes.join(', ');

    tr.innerHTML = `
      <td>${lanche.nome}</td>
      <td>${ingredientesStr}</td>
      <td>R$ ${lanche.preco.toFixed(2)}</td>
      <td>${lanche.estoque}</td>
      <td>
        <button onclick="venderLanche(${index})" ${lanche.estoque === 0 ? 'disabled' : ''}>Vender</button>
      </td>
    `;

    lancheListEl.appendChild(tr);
  });
}

function venderLanche(index) {
  const lanche = lanches[index];
  if (lanche.estoque > 0) {
    lanche.estoque--;
    totalVendas += lanche.preco;

    historicoVendas.push({ index, preco: lanche.preco });

    atualizarTotalVendas();
    renderLanches();
    atualizarEstadoBotaoDesfazerVenda();
  } else {
    alert("Sem estoque deste lanche!");
  }
}

function desfazerUltimaVenda() {
  if (historicoVendas.length > 0) {
    const ultimaVenda = historicoVendas.pop();
    const lanche = lanches[ultimaVenda.index];
    lanche.estoque++;
    totalVendas -= ultimaVenda.preco;
    atualizarTotalVendas();
    renderLanches();
    atualizarEstadoBotaoDesfazerVenda();
  }
}

function atualizarTotalVendas() {
  totalVendasEl.textContent = `Total de Vendas: R$ ${totalVendas.toFixed(2)}`;
}

function atualizarEstadoBotaoDesfazerVenda() {
  btnDesfazerVenda.disabled = historicoVendas.length === 0;
}

btnDesfazerVenda.addEventListener('click', desfazerUltimaVenda);

renderLanches();
btnDesfazerVenda.disabled = true;
