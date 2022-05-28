let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let topLeftCell=document.querySelector(".top-left-cell");
let allCells=document.querySelectorAll(".cell");
let addressInput=document.querySelector("#address");

cellsContentDiv.addEventListener("scroll",function(e)
{
    let scrollFromLeft=e.target.scrollLeft;
    let scrollFromTop=e.target.scrollTop;
    topRow.style.top=scrollFromTop+"px";
    leftCol.style.left=scrollFromLeft+"px";
    topLeftCell.style.top=scrollFromTop+"px";
    topLeftCell.style.left=scrollFromLeft+"px";
});

for(let i=0;i<allCells.length;i++)
{
    // Updating the address in address-content
    allCells[i].addEventListener("click",function(e)
    {
        let rowId=Number(e.target.getAttribute("rowId"));
        let colId=Number(e.target.getAttribute("colId"));
        let address=String.fromCharCode(65+colId)+(rowId+1)+"";
        addressInput.value=address;
    });
    // Storing the value in the cell in db
    allCells[i].addEventListener("blur",function(e)
    {
        let cellValue=e.target.textContent;
        let {rowId,colId}=getRowIdColIdFromElement(e.target);
        let cellObject=db[rowId][colId];
        // If the content in the cell does not get updated
        if(cellObject.value==cellValue)
        {
            return;
        }
        cellObject.value=cellValue;
        console.log("After update cellObject :- ",cellObject);
    });
}

function getRowIdColIdFromElement(element){
    let rowId  = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId,
        colId
    }
}