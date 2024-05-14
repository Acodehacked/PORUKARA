'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion'
import { BiError, BiLoaderCircle } from 'react-icons/bi';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { IoMdClose } from 'react-icons/io';
import { z } from 'zod';
import { changePasswordServer } from './action';
import SnackbarContext from '@/lib/Snackbar-context';
import { redirect, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const formSchema = z.object({
    oldpassword: z.string().min(1, "Please Enter Your old Password"),
    password: z.string().min(1, "Please Enter Your New Password"),
    Confirmpassword: z.string().min(1, "Please Repeat New Password"),
})
const Changepasswordform = () => {
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const [errorMsg, seterrorMsg] = useState("");
    const snackbarctx = useContext(SnackbarContext);
    const [errorShown, seterrorShown] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(values.password != values.Confirmpassword){
            seterrorMsg("Please Enter Same Password");
            seterrorShown(true)
            return ;
        }
        if(values.password.length < 8){
            seterrorMsg("Please Enter Password length more than 7 characters");
            seterrorShown(true)
            return ;
        }
        setloading(true);
        // const response = await db.select().from(AdminLoginTable).where({
        const sessionuser = await changePasswordServer({
            oldpassword: values.oldpassword,
            newpassword: values.password
        });
        console.log(sessionuser)
        if(sessionuser.error != null){
            seterrorMsg(sessionuser.error);
            seterrorShown(true)
        }else{
            snackbarctx.displayMsg(sessionuser.message)
            seterrorShown(false)
            form.reset();
            signOut();
            router.push('/admin');
        }
        setloading(false)
    }
    return <div className="flex">
        <Form {...form}>

            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} method="post" onSubmit={form.handleSubmit(onSubmit)} className="px-4 pt-4 space-y-5 max-w-[600px] w-full mx-auto">
                <h2 className="text-[25px] text-foreground ">Change Password</h2>
                <span className="text-secondary mb-2">you will be logoutted after changing of password</span>
                {errorShown && <div className="bg-red-500 mb-2 justify-between p-3 rounded-sm text-[13px] flex  text-white items-center">
                    <div className="flex items-center"><BiError size={20} className="text-white " /><span className={'ms-2 text-white'}>{errorMsg}</span></div>
                    <IoMdClose onClick={() => seterrorShown(false)} />
                </div>}
                <FormField
                    control={form.control}
                    name="oldpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <div className="flex items-center">
                                    <Input placeholder="Old Password" {...field} />
                                </div>
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage className="text-end" />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Input
                                        type={'text'}
                                        placeholder="Password" {...field} />
                                </div>
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="Confirmpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Input
                                        type={'text'}
                                        placeholder="Password" {...field} />
                                </div>
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <div className="px-2 flex justify-end w-full pb-4 ">
                    <motion.button initial={{ y: 10, opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} whileTap={loading ? {} : { scale: 0.97 }} className="bg-foreground text-white text-[13px] p-2 flex w-auto justify-center px-[40px] h-[40px] items-center rounded-xl" type="submit">{loading ? <BiLoaderCircle /> : 'Submit'}</motion.button>
                </div>
            </motion.form>
        </Form>
    </div>
}

export { Changepasswordform }