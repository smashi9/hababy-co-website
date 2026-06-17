import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareAuthClient } from "@/lib/supabase/middlewareAuth";
import { isEmailAllowedForAdmin } from "@/lib/supabase/authConfig";

function redirectToLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin/login";

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request,
  });
  const supabase = createSupabaseMiddlewareAuthClient(request, response);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return isLoginRoute ? response : redirectToLogin(request);
  }

  if (!isEmailAllowedForAdmin(user.email)) {
    await supabase.auth.signOut();
    return isLoginRoute ? response : redirectToLogin(request);
  }

  const { data: adminRows, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .eq("active", true)
    .limit(1);

  const isAdmin = !adminError && Boolean(adminRows?.[0]?.id);

  if (!isAdmin) {
    await supabase.auth.signOut();
    return isLoginRoute ? response : redirectToLogin(request);
  }

  if (isLoginRoute) {
    const ordersUrl = request.nextUrl.clone();
    ordersUrl.pathname = "/admin/orders";
    ordersUrl.search = "";
    return NextResponse.redirect(ordersUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
