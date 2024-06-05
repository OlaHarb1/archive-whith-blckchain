import HomePageLayout from "./layouts/HomePageLayout";
import HomePage from "./pages/HomePage";
import CollageSection from "./sections/CollageSection";
import AboutUs from "./sections/AboutUs";
import Footer from "./components/Footer";
import AdminLayouts from "./layouts/AdminLayouts";
import ViewStudents from "./pages/admin/student/ViewStudents";
import DetailsStudent from "./pages/admin/student/DetailsStudent";
import ViewProfessors from "./pages/admin/professor/ViewProfessors";
import DetailsProfessor from "./pages/admin/professor/DetailsProfessor";
import ViewEmployees from "./pages/admin/employee/ViewEmployees";
import ViewColleges from "./pages/admin/Sbjects/ViewColleges";
import ViewSubjects from "./pages/admin/Sbjects/ViewSubjects";
import EmployeeLayout from "./layouts/EmployeeLayout";
import ViewUserForEmployee from "./pages/employee/ViewUserForEmployee";
import ViewMarks from "./pages/employee/ViewMarks";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function App() {

    const nav = useNavigate();
    const detectAccountChange = (accounts) => {
        localStorage.clear();
        nav("/")
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", detectAccountChange);
        }

    }, []);

    return (

        <>
                <Routes>

                    <Route element={<HomePageLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path='collages/:id' element={<CollageSection/>}/>
                        <Route path='aboutus/:id' element={<AboutUs/>}/>
                        <Route path='contact/:id' element={<Footer/>}/>
                    </Route>

                    <Route path='/admin' element={<AdminLayouts/>}>
                        <Route path='students' element={<ViewStudents/>}/>
                        <Route path='students/details/:id' element={<DetailsStudent/>}/>

                        <Route path='professors' element={<ViewProfessors/>}/>
                        <Route path='professors/details/:id' element={<DetailsProfessor/>}/>

                        <Route path='employees' element={<ViewEmployees/>}/>

                        <Route path='colleges' element={<ViewColleges/>}/>
                        <Route path='colleges/subjects/:subjectName' element={<ViewSubjects/>}/>
                        <Route path='colleges/subjects/:collegeName/marks/:subjectId' element={<ViewMarks/>}/>

                    </Route>

                    <Route path='/employee' element={<EmployeeLayout/>}>
                        <Route path='colleges' element={<ViewColleges/>}/>
                        <Route path='colleges/subjects/:subjectName' element={<ViewSubjects/>}/>
                        <Route path='students/details/:id' element={<DetailsStudent/>}/>
                        <Route path='professors/details/:id' element={<DetailsProfessor/>}/>
                        <Route path='authorized' element={<ViewEmployees/>}/>



                        <Route path='colleges/subjects/:collegeName/marks/:subjectId' element={<ViewMarks/>}/>
                        <Route path=":userType" element={<ViewUserForEmployee/>}/>
                    </Route>
                    <Route path='students/details/:id' element={<DetailsStudent/>}/>
                    {/*<Route path='/info/student/details/:id' element={<DetailsStudent/>}/>*/}
                    <Route path='professors/details/:id' element={<DetailsProfessor/>}/>
                    <Route path='students' element={<ViewStudents/>}/>
                    <Route path='professors' element={<ViewProfessors/>}/>
                    <Route path='colleges' element={<ViewColleges/>}/>
                    <Route path='colleges/subjects/:subjectName' element={<ViewSubjects/>}/>


                </Routes>


        </>
    );
}

export default App;