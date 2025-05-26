const lanches = [
    { nome: "X-Burger", ingredientes: ["Pão", "Carne", "Queijo"], preco: 12.50, estoque: 10 },
    { nome: "X-Vegano", ingredientes: ["Pão", "Alface", "Tomate"], preco: 18.00, estoque: 8 },
    { nome: "X-Burger Especial", ingredientes: ["Pão", "Carne", "Queijo", "Ovo", "Frango"], preco: 16.50, estoque: 5 },
    { nome: "X-Calabresa", ingredientes: ["Pão", "Calabresa", "Queijo", "Cebola"], preco: 14.00, estoque: 7 },
    { nome: "X-Frango com Catupiry", ingredientes: ["Pão", "Frango", "Catupiry", "Alface"], preco: 15.50, estoque: 9 },
    { nome: "X-Bacon", ingredientes: ["Pão", "Carne", "Bacon", "Queijo"], preco: 17.00, estoque: 6 }
  ];
  
  let totalVendas = 0;
  
  const lancheList = document.getElementById("lanche-list");
  const totalVendasEl = document.getElementById("total-vendas");
  
  function exibirLanches() {
    lancheList.innerHTML = '';
  
    lanches.forEach((lanche, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${lanche.nome}</td>
        <td>${lanche.ingredientes.join(", ")}</td>
        <td>R$ ${lanche.preco.toFixed(2)}</td>
        <td>${lanche.estoque}</td>
        <td>
          <button 
            type="button" 
            aria-label="Vender ${lanche.nome}" 
            data-index="${index}" 
            ${lanche.estoque <= 0 ? "disabled" : ""}>
            Vender
          </button>
        </td>
      `;
  
      lancheList.appendChild(row);
    });
    const botoes = lancheList.querySelectorAll("button");
    botoes.forEach(botao => {
      botao.addEventListener("click", () => {
        const idx = Number(botao.dataset.index);
        venderLanche(idx);
      });
    });
  }
  
  function venderLanche(index) {
    const lanche = lanches[index];
    if (lanche.estoque > 0) {
      lanche.estoque--;
      totalVendas += lanche.preco;
      atualizarUI();
    }
  }
  
  function atualizarUI() {
    exibirLanches();
    totalVendasEl.textContent = `Total de Vendas: R$ ${totalVendas.toFixed(2)}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    exibirLanches();
  });
  