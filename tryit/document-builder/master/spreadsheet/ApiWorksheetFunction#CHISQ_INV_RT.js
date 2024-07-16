builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.CHISQ_INV_RT(0.4, 10);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "CHISQ_INV_RT.xlsx");
builder.CloseFile();