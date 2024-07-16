builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();

var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.MONTH("3/16/2018"); 

oWorksheet.GetRange("C1").SetValue(ans);

builder.SaveFile("xlsx", "MONTH.xlsx");
builder.CloseFile();