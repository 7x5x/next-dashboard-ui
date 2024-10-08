import React from 'react'
import TeacherForm from "@/components/forms/TeacherForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AnnouncementListPage from '@/app/admin/list/announcements/page';
 

export default function PaidImpressionsData() {
  return <CardWrapper></CardWrapper>;
}


const CardWrapper = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h1>Paid Impressions</h1>
        </CardHeader>
        <CardContent className=" grid grid-cols-7 gap-4">
          <div className=' flex gap-4 col-span-6'>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </div>
          <Button>Save</Button>
        </CardContent>
        <AnnouncementListPage></AnnouncementListPage>
      </Card>
    </>
  );
};