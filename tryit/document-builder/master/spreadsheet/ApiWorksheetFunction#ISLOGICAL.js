builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();
oWorksheet.GetRange("B3").SetValue("66");

var oFunction = Api.GetWorksheetFunction();
var result = oFunction.ISLOGICAL(oWorksheet.GetRange("B3"));
oWorksheet.GetRange("C3").SetValue(result);

builder.SaveFile("xlsx", "ISLOGICAL.xlsx");
builder.CloseFile();