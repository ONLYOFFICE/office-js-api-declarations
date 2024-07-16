builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var result = oFunction.ISEVEN("66");
oWorksheet.GetRange("C3").SetValue(result)

builder.SaveFile("xlsx", "ISEVEN.xlsx");
builder.CloseFile();