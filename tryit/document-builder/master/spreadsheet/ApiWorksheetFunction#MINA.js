builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var minA = oFunction.MINA(23, 45, true, "text", 0.89);
oWorksheet.GetRange("C1").SetValue(minA);

builder.SaveFile("xlsx", "MINA.xlsx");
builder.CloseFile();