export default {
  formatPhone: (number) => {
    var cleaned = ("" + number).replace(/\D/g, "");
    var length = cleaned.length;
    if (length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (length <= 11) {
      return (
        "+" +
        cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
      );
    } else if (length <= 12) {
      return (
        "+" + cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
      );
    } else {
      return "+" + cleaned;
    }
  },
};
