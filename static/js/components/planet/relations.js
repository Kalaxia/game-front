const initPlanetRelations = (container, relations) => {
  var config = {
      type: 'doughnut',
      data: getRelationDatasets(relations),
      options: {
          responsive: true,
          legend: {
              display: false,
          },
          tooltips: {
              filter: (item, data) => (typeof data.datasets[item.datasetIndex].labels[item.index] !== "undefined"),
              callbacks: {
                  label: (tooltipItem, data) => {
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      var index = tooltipItem.index;
                      return dataset.labels[index] + ': ' + getRelationshipIndicator(dataset.data[index], dataset.scoreType[index]);
                  }
              }
          }
      }
  };
  var ctx = container.querySelector(".chart-area").getContext("2d");
  var myDoughnut = new Chart(ctx, config);
};

const getRelationDatasets = relations => {
  var factionDataset = { data: [], labels: [], scoreType: [], backgroundColor: [] };
  var playerDataset = { data: [], labels: [], scoreType: [], backgroundColor: [] };
  var labels = [];
  for (key in relations) {
    let relation = relations[key];
    if (relation.faction !== null) {
      var dataset = factionDataset;
      var color = relation.faction.color;
      var name = relation.faction.name;
    } else {
      var dataset = playerDataset;
      var color = relation.player.faction.color;
      var name = relation.player.pseudo;
    }
    dataset.data.push(Math.abs(relation.score));
    if (relation.score > 0) {
      dataset.backgroundColor.push(color);
      dataset.scoreType.push(true);
    } else {
      dataset.backgroundColor.push(shadeColor(color, -0.2));
      dataset.scoreType.push(false);
    }
    dataset.labels.push(name);
  }
  // Fill the chart
  factionDataset.data.push(
    (factionDataset.data.length > 0)
    ? (500 * (factionDataset.data.length - 1)) + 500
    : 500
  );
  factionDataset.backgroundColor.push("#242424");
  playerDataset.data.push(
    (playerDataset.data.length > 0)
    ? (100 * (playerDataset.data.length - 1)) + 500
    : 500
  );
  playerDataset.backgroundColor.push("#242424");

  return {
    datasets: [playerDataset, factionDataset],
    labels: labels
  };
};

const getRelationshipIndicator = (score, isPositive) => {
  if (isPositive === false) {
    score *= -1;
  }
  let indicators = dictionnary.diplomacy.relations.indicators;
  switch (true) {
    case (score >= 500): return indicators.philanthropic;
    case (score >= 400): return indicators.excellent;
    case (score >= 300): return indicators.friendly;
    case (score >= 200): return indicators.good;
    case (score >= 100): return indicators.cordial;
    case (score >= 0): return indicators.neutral;
    case (score >= -100): return indicators.cold;
    case (score >= -200): return indicators.hostile;
    case (score >= -300): return indicators.odious;
    case (score >= -400): return indicators.infamous;
  }
};
