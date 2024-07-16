builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet(); 
var oFunction = Api.GetWorksheetFunction();
var result = oFunction.SHEET("Sheet1");
oWorksheet.GetRange("C3").SetValue(result);

builder.SaveFile("xlsx", "SHEET.xlsx");
builder.CloseFile();