builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FV(0.1/12, 2*12, -500, 10000));
builder.SaveFile("xlsx", "FV.xlsx");
builder.CloseFile();