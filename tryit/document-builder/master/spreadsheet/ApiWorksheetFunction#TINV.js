
builder.CreateFile("xlsx");

var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var result = oFunction.TINV(0.5, 10);
oWorksheet.GetRange("B2").SetValue(result);

builder.SaveFile("xlsx", "TINV.xlsx");
builder.CloseFile();

