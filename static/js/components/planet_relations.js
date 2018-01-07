const shadeColor = (color, percent) => {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
};

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
              filter: (item, data) => (data.datasets[item.datasetIndex].labels[item.index] !== ""),
              callbacks: {
                  label: (tooltipItem, data) => {
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      var index = tooltipItem.index;
                      return (dataset.labels[index] !== "")
                        ? dataset.labels[index] + ': ' + getRelationshipIndicator(dataset.data[index])
                        : false
                      ;
                  }
              }
          }
      }
  };
  var ctx = container.querySelector(".chart-area").getContext("2d");
  var myDoughnut = new Chart(ctx, config);
};

const getRelationDatasets = relations => {
  var factionDataset = { data: [], labels: [], backgroundColor: [] };
  var playerDataset = { data: [], labels: [], backgroundColor: [] };
  var labels = [];
  for (key in relations) {
    let relation = relations[key];
    if (relation.faction !== null) {
      // Temporary
      relation.faction.color = "#48C";
      factionDataset.data.push(relation.score);
      factionDataset.backgroundColor.push(
        (relation.score > 0)
        ? relation.faction.color
        : shadeColor(relation.faction.color, -0.2)
      )
      factionDataset.labels.push(relation.faction.name);
      continue;
    }
    relation.player.faction.color = "#48C";
    playerDataset.data.push(relation.score);
    playerDataset.backgroundColor.push(
      (relation.score > 0)
      ? relation.player.faction.color
      : shadeColor(relation.player.faction.color, -0.2)
    );
    playerDataset.labels.push(relation.player.pseudo);
  }
  factionDataset.data.push(
    (factionDataset.data.length > 0)
    ? (500 * (factionDataset.data.length - 1)) + 500
    : 500
  );
  factionDataset.backgroundColor.push("#242424");
  factionDataset.labels.push("");
  playerDataset.data.push(
    (playerDataset.data.length > 0)
    ? (500 * (playerDataset.data.length - 1)) + 500
    : 500
  );
  playerDataset.backgroundColor.push("#242424");
  playerDataset.labels.push("");

  return {
    datasets: [playerDataset, factionDataset],
    labels: labels
  };
};

const getRelationshipIndicator = score => {
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
