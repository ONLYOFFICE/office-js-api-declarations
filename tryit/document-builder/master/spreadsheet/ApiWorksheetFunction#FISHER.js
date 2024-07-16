
builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.FISHER(0.56);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "FISHER.xlsx");
builder.CloseFile();



