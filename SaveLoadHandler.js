export default class SaveLoadHandler{
    constructor(stateSetter, renderHandler){
        this.SEPERATOR = "&";
        this.stateSetter = stateSetter;
        //this.renderHandler = renderHandler;
    }

    //state should be an array
    save(state, fileName){
        //Create blob
        //!getState should be implemented here. LogicalCanvas shouldn't care about such low level details related to file format

        //function taken from https://stackoverflow.com/questions/37128624/terse-way-to-intersperse-element-between-all-elements-in-javascript-array
        const intersperse = (arr, sep) => arr.reduce((a,v)=>[...a,v,sep],[]).slice(0,-1)

        const data = new Blob(intersperse(state, this.SEPERATOR), {type: "text/plain"});
        
        //Create URL for the blob
        const url = URL.createObjectURL(data);

        //Create temp element
        const tempElement = document.createElement("a");
        tempElement.setAttribute("type", "hidden");//Just in case: we don't want it to be visible
        tempElement.href = url;
        tempElement.download= fileName;

        //Trigger a click to start download
        tempElement.click();

        //Clean up
        URL.revokeObjectURL(url);
        tempElement.remove();
    }
    
    
    load(dataStr){
        let dataArr = dataStr.split(this.SEPERATOR);
        let res = []
        for (let i = 0; i < dataArr.length; i++ ){
            res.push([])
            
            let cur = dataArr[i].split(",");
            for (let j = 0; j < cur.length; j++){
                res[i].push(parseInt(cur[j]))
            }
        }
        console.log(dataArr)
        console.log(res)
        this.stateSetter(res);
        //this.renderHandler();
    }
}