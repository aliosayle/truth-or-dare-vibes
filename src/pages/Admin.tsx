
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { CardForm } from '@/components/admin/CardForm';
import { PackForm } from '@/components/admin/PackForm';
import { AdminPackList } from '@/components/admin/AdminPackList';
import { AdminCardList } from '@/components/admin/AdminCardList';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { isAdmin } = useAuth();
  
  // Redirect if user is not an admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 md:py-6">
        <motion.div 
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-white/70 mt-2">
            Manage packs and cards for your Truth or Dare game
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="create-pack">
              <TabsList className="mb-4">
                <TabsTrigger value="create-pack">Create Pack</TabsTrigger>
                <TabsTrigger value="manage-packs">Manage Packs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create-pack" className="space-y-4">
                <PackForm />
              </TabsContent>
              
              <TabsContent value="manage-packs">
                <AdminPackList />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="create-card">
              <TabsList className="mb-4">
                <TabsTrigger value="create-card">Create Card</TabsTrigger>
                <TabsTrigger value="manage-cards">Manage Cards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create-card" className="space-y-4">
                <CardForm />
              </TabsContent>
              
              <TabsContent value="manage-cards">
                <AdminCardList />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
