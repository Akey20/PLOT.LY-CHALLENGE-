
// function that poulates the meta data
function demoInfo(sample)
{
    console.log(sample);

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
        // console.log(metaData);

        //filter based on value of sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // access index 0 from array
        let resultData = result[0];
        // console.log(resultData);

        //clear metadata
        d3.select("#sample-metadata").html("");

        //use Object.entries to get value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            // add to sample data / demo section
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
        
    });    
}

// function that builds the graphs
function buildBarChart(sample)
{
    // console.log(sample);
    // let data = d3.json("samples.json");
    // console.log(data);

    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        //console.log(sampleData);
        
        //filter based on value of sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);
        
        // access index 0 from array
        let resultData = result[0];
        console.log(resultData);

        // get the otu_ids, and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        //build the bar chart
        //get y ticks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
              
    });     
}


//function that builds bubble chart
function buildBubbleChart(sample)
{
    // console.log(sample);
    // let data = d3.json("samples.json");
    // console.log(data);

    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        //console.log(sampleData);
        
        //filter based on value of sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);
        
        // access index 0 from array
        let resultData = result[0];
        //console.log(resultData);

        // get the otu_ids, and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        //build the bubble chart
        
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Bright"

            }
        }

        let layout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
              
    });     
}


// function that initalizes the dashboard
function initialize()
{
   
    //access dropdown selector from index file
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;    
        console.log(sampleNames);

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        // //pass in the information from first sample
        let sample1 = sampleNames[0];

        //call funtion to build metadata
        demoInfo(sample1);

        //callfunction to build bar chart
        buildBarChart(sample1);
        //call function to build bubble chart
        buildBubbleChart(sample1);

    });    
  
}

// function that updates the dashboard
function optionChanged(item)
{
    //call update to metadata
    demoInfo(item);
    //console.log(item);
    //call function to build bar chart
    buildBarChart(item);
    //call function to build bubble chart
    buildBubbleChart(item);
}

// call the function
initialize();