import { useEffect, useState } from "react";

export function usePhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkIsPhone = () => setIsPhone(window.innerWidth <= 1024);
    checkIsPhone();

    window.addEventListener("resize", checkIsPhone);
    return () => window.removeEventListener("resize", checkIsPhone);
  }, []);

  return isPhone;
}
