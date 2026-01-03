import { Link } from "react-router-dom";
import {Megaphone, Users, CreditCard, CircleUserRound, GraduationCap} from "lucide-react"


function NavBar() {
    return (
        <header className="bg-base-300 border-b border-base-content/20 sticky top-0 z-20">
            <div className="mx-auto max-w-6xl p-3">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
                        EntrancePrep
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link to="" className="btn btn-primary">
                            <span>COURSES</span>
                            <GraduationCap className="size-5"/>
                        </Link>

                        <Link to="/notice" className="btn btn-primary">
                            <span>NOTICE</span>
                            <Megaphone className="size-5"/>
                        </Link>

                        <Link to="" className="btn btn-primary">
                            <span>ABOUT US</span>
                            <Users className="size-5" />
                        </Link>

                        <Link to="" className="btn btn-primary">
                            <span>SUBSCRIPTION</span>
                            <CreditCard className="size-5"/>
                        </Link>

                        <Link to="/signup" className="btn btn-primary">
                            <span>ACCOUNT</span>
                            <CircleUserRound className="size-5"/>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;