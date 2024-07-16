builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet(); 
var oFunction = Api.GetWorksheetFunction();
var result = oFunction.NA();
oWorksheet.GetRange("C3").SetValue(result);

builder.SaveFile("xlsx", "NA.xlsx");
builder.CloseFile();