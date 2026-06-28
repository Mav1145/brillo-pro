import brilloLogo from './logo.png'
import brilloHeader from './header.png'
import React, { useState, useEffect, useRef } from "react";

const SERVICES_EN = ["Standard Clean","Deep Clean","Move-In Clean","Move-Out Clean","Post-Construction Clean","Airbnb / Vacation Rental Turnover","Office Clean","Retail Store Clean","Medical Office Clean","School / Daycare Clean","Restaurant Clean","Warehouse / Facility Clean","Inside Refrigerator","Inside Oven","Inside Cabinets","Interior Windows","Laundry & Folding","Organizing","Carpet Cleaning","Disinfection Service","Garage Clean","Patio / Balcony Clean","Other Service"];
const SERVICES_ES = ["Limpieza Estándar","Limpieza Profunda","Limpieza de Entrada","Limpieza de Salida","Limpieza Post-Construcción","Limpieza de Airbnb / Renta Vacacional","Limpieza de Oficina","Limpieza de Tienda","Limpieza de Oficina Médica","Limpieza de Escuela / Guardería","Limpieza de Restaurante","Limpieza de Bodega / Instalación","Interior de Refrigerador","Interior de Horno","Interior de Gabinetes","Ventanas Interiores","Lavandería y Doblar Ropa","Organización","Limpieza de Alfombra","Servicio de Desinfección","Limpieza de Garage","Limpieza de Patio / Balcón","Otro Servicio"];

const TRANSLATIONS = {
  en: {
    appName:"BrilloPro", tagline:"Manage Your Cleaners. Grow Your Business.",
    tabs:["Route","Clients","Invoices","Estimates","Billing"],
    route:{title:"Today's Stops",addStop:"Add Stop",address:"Address",client:"Client Name",addBtn:"Add",noStops:"No stops added yet. Add a client stop to begin.",navigate:"Start GPS",remove:"Remove",stop:"Stop",loadToday:"Load Today's Route",noScheduled:"No clients scheduled for today.",clearRoute:"Clear Route",optimize:"⚡ Optimize Order",optimized:"✓ Route optimized!",crew1:"Crew 1",crew2:"Crew 2",allCrew:"All Crews",jobTracker:"Job Tracker",scheduled:"Scheduled",completed:"Completed",pending:"Pending Jobs"},
    clients:{title:"Clients",addClient:"Add Client",name:"Full Name",phone:"Phone Number",address:"Address",email:"Email (optional)",save:"Save Client",update:"Update Client",noClients:"No clients yet. Add your first client.",call:"Call",directions:"Directions",edit:"Edit",delete:"Delete",confirmDelete:"Delete this client?",schedule:"Cleaning Schedule",weekly:"Weekly",biweeklyA:"Bi-Weekly (Week A)",biweeklyB:"Bi-Weekly (Week B)",oneTime:"One-Time / No Schedule",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysFull:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],import:"📥 Import CSV",downloadTemplate:"📄 Download Template",importTitle:"Import Clients from CSV",importBlurb:"Upload a CSV file to add many clients at once. Download the template, fill in your clients in Excel or Google Sheets, save as CSV, then upload here.",importSuccess:"clients imported!",importError:"Could not read this file. Make sure it's a CSV file.",schedHelp:"Schedule: weekly, biweeklyA, biweeklyB, or oneTime.",access:"Entry Access",accessTypes:["Key","Lockbox","Client Present","Door Code"],lockboxCode:"Lockbox Code (PIN-protected)",supplies:"Supplies",suppliesTypes:["We Provide","Client Provides","Both"],pets:"Pets in Home",petsTypes:["No Pets","Dog","Cat","Dog & Cat","Other"],preferredCleaner:"Preferred Cleaner",locationType:"Location Type",locationTypes:["Residential","Commercial","Airbnb / Rental"],nextVisit:"Next Visit",recurring:"Recurring",oneTimeLabel:"One-Time"},
    invoices:{title:"Invoices",create:"Create Invoice",client:"Select Client",service:"Service",amount:"Amount ($)",date:"Date",send:"Save Invoice",paid:"Paid",pending:"Pending",noInvoices:"No invoices yet. Create your first invoice.",total:"Total",services:SERVICES_EN,markPaid:"Mark Paid",review:"Request Review",addLine:"+ Add Service Line",removeLine:"Remove",lineItems:"Service Lines",from:"From",to:"Bill To",setup:"Set up your company info in Settings to show your business name on invoices.",invoiceNum:"Invoice #",textInv:"📱 Text",emailInv:"✉️ Email",deleteInv:"Delete",confirmDelInv:"Delete this invoice?"},
    estimates:{title:"Estimates",create:"Create Estimate",client:"Select Client",service:"Service Description",amount:"Estimated Amount ($)",notes:"Notes",save:"Save Estimate",convert:"Convert to Invoice",noEstimates:"No estimates yet.",approved:"Approved",pending:"Pending",convertConfirm:"Convert this estimate to an invoice?",converted:"✓ Estimate converted to invoice!",textEst:"📱 Text",emailEst:"✉️ Email",deleteEst:"Delete",confirmDelEst:"Delete this estimate?"},
    billing:{title:"Billing & Reports",totalEarned:"Total Earned",totalPending:"Pending",thisMonth:"This Month",lastMonth:"Last Month",export:"📊 Export Invoices to CSV",exportEstimates:"📋 Export Estimates to CSV",backup:"💾 Backup All Data",restore:"📂 Restore from Backup",backupSuccess:"✓ Backup downloaded!",restoreSuccess:"✓ Data restored!",restoreError:"Invalid backup file.",plan:"Subscription Plan",monthly:"$24.99/month",annual:"$199/year",settings:"Company Settings",companyName:"Company Name",ownerName:"Owner Name",phone:"Phone Number",email:"Email",address:"Business Address",license:"License # (optional)",saveSettings:"Save Settings",saved:"Settings saved!",exportTitle:"Accounting Export",exportBlurb:"Download your invoices as a CSV file to import into QuickBooks, Wave, FreshBooks, Xero, or your accountant's software.",noData:"No data to export yet.",paymentsTitle:"Payment Methods Accepted",paymentsBlurb:"Select which payment methods you accept. These will appear on every invoice.",check:"Check",cash:"Cash",zelle:"Zelle",venmo:"Venmo",cashapp:"Cash App",creditCard:"Credit Card",paymentHandle:"Handle/Number (e.g. @Yourname or phone)",reviewTitle:"Google Review Link",reviewBlurb:"Paste your Google Business review link here.",reviewPlaceholder:"https://g.page/r/YOUR-CODE/review",billingPin:"Billing PIN",billingPinSet:"Set a 4-digit PIN to protect this tab.",billingPinEnter:"Enter PIN to access Billing",billingPinWrong:"Incorrect PIN. Try again.",billingPinSave:"Save PIN",billingPinLock:"Lock Billing Tab"},
    access:{title:"Enter Access Code",subtitle:"Enter your BrilloPro access code to get started.",placeholder:"",btn:"Unlock App",error:"Invalid access code. Please try again.",codes:["BP-2025-LAUNCH","BP-2025-BETA1","BP-2025-BETA2"]},
    setup:{title:"Welcome to BrilloPro!",subtitle:"Let's set up your cleaning business. This info will appear on your invoices and estimates.",companyName:"Company Name",ownerName:"Your Name",phone:"Business Phone",email:"Business Email",address:"Business Address",continue:"Continue to App",skip:"Skip for now",payments:"Payment Methods You Accept"},
    pdf:"🖨️ Print/PDF", lang:"Español",
  },
  es: {
    appName:"BrilloPro", tagline:"Maneja Tu Equipo. Haz Brillar Tu Negocio.",
    tabs:["Ruta","Clientes","Facturas","Estimados","Facturación"],
    route:{title:"Paradas de Hoy",addStop:"Agregar Parada",address:"Dirección",client:"Nombre del Cliente",addBtn:"Agregar",noStops:"No hay paradas. Agrega una parada para comenzar.",navigate:"Iniciar GPS",remove:"Eliminar",stop:"Parada",loadToday:"Cargar Ruta de Hoy",noScheduled:"No hay clientes programados para hoy.",clearRoute:"Borrar Ruta",optimize:"⚡ Optimizar Orden",optimized:"✓ ¡Ruta optimizada!",crew1:"Equipo 1",crew2:"Equipo 2",allCrew:"Todos los Equipos",jobTracker:"Seguimiento de Trabajos",scheduled:"Programados",completed:"Completados",pending:"Pendientes"},
    clients:{title:"Clientes",addClient:"Agregar Cliente",name:"Nombre Completo",phone:"Teléfono",address:"Dirección",email:"Correo (opcional)",save:"Guardar Cliente",update:"Actualizar Cliente",noClients:"No hay clientes. Agrega tu primer cliente.",call:"Llamar",directions:"Direcciones",edit:"Editar",delete:"Eliminar",confirmDelete:"¿Eliminar este cliente?",schedule:"Horario de Limpieza",weekly:"Semanal",biweeklyA:"Quincenal (Semana A)",biweeklyB:"Quincenal (Semana B)",oneTime:"Una Vez / Sin Horario",days:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],daysFull:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],import:"📥 Importar CSV",downloadTemplate:"📄 Descargar Plantilla",importTitle:"Importar Clientes desde CSV",importBlurb:"Sube un archivo CSV para agregar muchos clientes.",importSuccess:"¡clientes importados!",importError:"No se pudo leer el archivo.",schedHelp:"Horario: weekly, biweeklyA, biweeklyB, o oneTime.",access:"Acceso a la Casa",accessTypes:["Llave","Caja de Llaves","Cliente Presente","Código de Puerta"],lockboxCode:"Código de Caja (protegido con PIN)",supplies:"Suministros",suppliesTypes:["Nosotros Proveemos","Cliente Provee","Ambos"],pets:"Mascotas en Casa",petsTypes:["Sin Mascotas","Perro","Gato","Perro y Gato","Otro"],preferredCleaner:"Limpiador(a) Preferido(a)",locationType:"Tipo de Lugar",locationTypes:["Residencial","Comercial","Airbnb / Renta"],nextVisit:"Próxima Visita",recurring:"Recurrente",oneTimeLabel:"Una Vez"},
    invoices:{title:"Facturas",create:"Crear Factura",client:"Seleccionar Cliente",service:"Servicio",amount:"Cantidad ($)",date:"Fecha",send:"Guardar Factura",paid:"Pagado",pending:"Pendiente",noInvoices:"No hay facturas.",total:"Total",services:SERVICES_ES,markPaid:"Marcar Pagado",review:"Pedir Reseña",addLine:"+ Agregar Servicio",removeLine:"Quitar",lineItems:"Servicios",from:"De",to:"Para",setup:"Configura tu negocio en Ajustes.",invoiceNum:"Factura #",textInv:"📱 Mensaje",emailInv:"✉️ Correo",deleteInv:"Eliminar",confirmDelInv:"¿Eliminar esta factura?"},
    estimates:{title:"Estimados",create:"Crear Estimado",client:"Seleccionar Cliente",service:"Descripción del Servicio",amount:"Cantidad Estimada ($)",notes:"Notas",save:"Guardar Estimado",convert:"Convertir a Factura",noEstimates:"No hay estimados.",approved:"Aprobado",pending:"Pendiente",convertConfirm:"¿Convertir este estimado a factura?",converted:"✓ ¡Estimado convertido!",textEst:"📱 Mensaje",emailEst:"✉️ Correo",deleteEst:"Eliminar",confirmDelEst:"¿Eliminar este estimado?"},
    billing:{title:"Facturación y Reportes",totalEarned:"Total Ganado",totalPending:"Pendiente",thisMonth:"Este Mes",lastMonth:"Mes Pasado",export:"📊 Exportar Facturas a CSV",exportEstimates:"📋 Exportar Estimados a CSV",backup:"💾 Respaldar Datos",restore:"📂 Restaurar",backupSuccess:"✓ ¡Respaldo descargado!",restoreSuccess:"✓ ¡Datos restaurados!",restoreError:"Archivo inválido.",plan:"Plan de Suscripción",monthly:"$24.99/mes",annual:"$199/año",settings:"Información del Negocio",companyName:"Nombre del Negocio",ownerName:"Nombre del Dueño",phone:"Teléfono",email:"Correo",address:"Dirección del Negocio",license:"Licencia # (opcional)",saveSettings:"Guardar",saved:"¡Guardado!",exportTitle:"Exportar para Contabilidad",exportBlurb:"Descarga tus facturas en CSV para QuickBooks, Wave, etc.",noData:"No hay datos todavía.",paymentsTitle:"Métodos de Pago Aceptados",paymentsBlurb:"Selecciona los métodos de pago que aceptas.",check:"Cheque",cash:"Efectivo",zelle:"Zelle",venmo:"Venmo",cashapp:"Cash App",creditCard:"Tarjeta de Crédito",paymentHandle:"Usuario/Número",reviewTitle:"Link de Reseñas de Google",reviewBlurb:"Pega aquí el link de reseñas de tu negocio en Google.",reviewPlaceholder:"https://g.page/r/TU-CODIGO/review",billingPin:"PIN de Facturación",billingPinSet:"Establece un PIN de 4 dígitos para proteger esta pestaña.",billingPinEnter:"Ingresa el PIN para acceder a Facturación",billingPinWrong:"PIN incorrecto. Intenta de nuevo.",billingPinSave:"Guardar PIN",billingPinLock:"Bloquear Facturación"},
    access:{title:"Ingresa tu Código",subtitle:"Ingresa tu código de acceso de BrilloPro para comenzar.",placeholder:"",btn:"Desbloquear App",error:"Código inválido. Intenta de nuevo.",codes:["BP-2025-LAUNCH","BP-2025-BETA1","BP-2025-BETA2"]},
    setup:{title:"¡Bienvenido a BrilloPro!",subtitle:"Configura tu negocio de limpieza.",companyName:"Nombre del Negocio",ownerName:"Tu Nombre",phone:"Teléfono del Negocio",email:"Correo del Negocio",address:"Dirección del Negocio",continue:"Continuar a la App",skip:"Saltar por ahora",payments:"Métodos de Pago que Aceptas"},
    pdf:"🖨️ Imprimir/PDF", lang:"English",
  },
};

const C = {blue:"#0EA5E9",blueDark:"#0369A1",bluePale:"#E0F2FE",blueLight:"#BAE6FD",white:"#ffffff",gray:"#F0F9FF",grayMid:"#BAE6FD",grayDark:"#64748B",text:"#0F172A",black:"#0C1929",red:"#DC2626",orange:"#F59E0B",green:"#10B981",teal:"#0284C7",purple:"#8B5CF6"};

const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} };
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } };

const formatDate = (iso) => { if (!iso) return ""; const parts = String(iso).split("-"); if (parts.length !== 3) return iso; const [y,m,d] = parts; const mo=parseInt(m,10),dy=parseInt(d,10); if(isNaN(mo)||isNaN(dy)) return iso; return `${mo}/${dy}/${y}`; };

const formatInvoiceText = (inv, company, t) => {
  let text = "";
  if (company.companyName) text += `${company.companyName}\n`;
  if (company.ownerName) text += `${company.ownerName}\n`;
  if (company.phone) text += `${company.phone}\n`;
  text += `\n${t.invoices.invoiceNum}: ${inv.id}\n${t.invoices.date}: ${formatDate(inv.date)}\n\n`;
  text += `${t.invoices.to}: ${inv.client}\n\n`;
  if (inv.lines) inv.lines.forEach(l => { text += `• ${l.service} (${formatDate(l.date)}) — $${parseFloat(l.amount).toFixed(2)}\n`; });
  text += `\n${t.invoices.total}: $${parseFloat(inv.total).toFixed(2)}\nStatus: ${inv.status}\n`;
  return text;
};

const sendSMS = (phone, body) => { const p=(phone||"").replace(/[^\d+]/g,""); window.location.href=`sms:${p}?body=${encodeURIComponent(body)}`; };
const sendEmail = (email, subject, body) => { window.location.href=`mailto:${email||""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; };

const optimizeRoute = (stops) => {
  if (stops.length < 2) return stops;
  const getKey = (s) => { const z=(s.address||"").match(/\b\d{5}\b/); if(z) return z[0]; const p=(s.address||"").split(","); return p.length>1?p[1].trim().toLowerCase():(s.address||"").toLowerCase(); };
  const grouped = {};
  stops.forEach(s => { const k=getKey(s); if(!grouped[k]) grouped[k]=[]; grouped[k].push(s); });
  const result = [];
  Object.keys(grouped).sort().forEach(k => grouped[k].forEach(s => result.push(s)));
  return result;
};

const printInvoice = (inv, company, t) => {
  const win = window.open("","_blank"); if(!win) return;
  const payments = company.payments||{};
  const enabledPayments = Object.entries(payments).filter(([k,v])=>v&&v.enabled);
  const paymentsHtml = enabledPayments.length>0?`<div style="margin-top:30px;padding:16px;background:#E0F2FE;border-radius:8px;border-left:4px solid #0EA5E9;"><div style="font-weight:bold;color:#0EA5E9;margin-bottom:8px;">${t.billing.paymentsTitle}:</div>${enabledPayments.map(([k,v])=>`<div style="margin:4px 0;font-size:14px;">✓ <strong>${t.billing[k]||k}</strong>${v.handle?` — ${v.handle}`:''}</div>`).join("")}</div>`:"";
  const linesHtml = (inv.lines||[]).map(l=>`<tr><td style="padding:8px;border-bottom:1px solid #eee;">${l.service||""}</td><td style="padding:8px;border-bottom:1px solid #eee;">${formatDate(l.date)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${parseFloat(l.amount||0).toFixed(2)}</td></tr>`).join("");
  const html=`<!DOCTYPE html><html><head><title>${t.invoices.invoiceNum} ${inv.id}</title><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px;color:#0F172A;"><div style="border-bottom:3px solid #0EA5E9;padding-bottom:20px;margin-bottom:30px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;"><div><div style="font-size:28px;font-weight:800;color:#0EA5E9;">${company.companyName||"Your Company"}</div>${company.ownerName?`<div style="color:#64748B;">${company.ownerName}</div>`:""}${company.phone?`<div style="color:#64748B;">📞 ${company.phone}</div>`:""}${company.email?`<div style="color:#64748B;">✉️ ${company.email}</div>`:""}${company.address?`<div style="color:#64748B;">${company.address}</div>`:""}${company.license?`<div style="color:#64748B;font-size:11px;">License: ${company.license}</div>`:""}</div><div style="text-align:right;"><div style="font-size:24px;font-weight:800;">INVOICE</div><div style="color:#64748B;">#${inv.id}</div><div style="color:#64748B;">${formatDate(inv.date)}</div></div></div></div><div style="margin-bottom:24px;"><div style="font-size:12px;color:#64748B;font-weight:bold;">${t.invoices.to}:</div><div style="font-size:18px;font-weight:bold;">${inv.client}</div></div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;"><thead><tr style="background:#0EA5E9;color:white;"><th style="padding:10px;text-align:left;">${t.invoices.service}</th><th style="padding:10px;text-align:left;">${t.invoices.date}</th><th style="padding:10px;text-align:right;">${t.invoices.amount}</th></tr></thead><tbody>${linesHtml}</tbody></table><div style="text-align:right;font-size:22px;font-weight:800;color:#0EA5E9;padding:14px;background:#E0F2FE;border-radius:8px;">${t.invoices.total}: $${parseFloat(inv.total||0).toFixed(2)}</div><div style="margin-top:14px;text-align:right;font-size:14px;font-weight:600;color:${inv.status==='paid'?'#10B981':'#F59E0B'};">${inv.status==='paid'?t.invoices.paid.toUpperCase():t.invoices.pending.toUpperCase()}</div>${paymentsHtml}<div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;color:#999;font-size:11px;">Generated by BrilloPro · © 2025 Avanza One LLC. All rights reserved.</div></body></html>`;
  win.document.write(html); win.document.close(); setTimeout(()=>win.print(),500);
};

const printEstimate = (est, company, t) => {
  const win = window.open("","_blank"); if(!win) return;
  const linesHtml=(est.lines||[]).map(l=>`<tr><td style="padding:8px;border-bottom:1px solid #eee;">${l.service||""}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${parseFloat(l.amount||0).toFixed(2)}</td></tr>`).join("");
  const notesHtml=est.notes?`<div style="margin-top:20px;padding:14px;background:#f8f8f8;border-radius:8px;border-left:4px solid #888;"><strong>Notes:</strong> ${est.notes}</div>`:"";
  const html=`<!DOCTYPE html><html><head><title>Estimate ${est.id}</title><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px;color:#0F172A;"><div style="border-bottom:3px solid #0EA5E9;padding-bottom:20px;margin-bottom:30px;"><div style="display:flex;justify-content:space-between;"><div><div style="font-size:28px;font-weight:800;color:#0EA5E9;">${company.companyName||"Your Company"}</div>${company.phone?`<div style="color:#64748B;">📞 ${company.phone}</div>`:""}${company.email?`<div style="color:#64748B;">✉️ ${company.email}</div>`:""}</div><div style="text-align:right;"><div style="font-size:24px;font-weight:800;">${t.estimates.title.toUpperCase()}</div><div style="color:#64748B;">#${est.id}</div><div style="color:#64748B;">${formatDate(est.date)}</div></div></div></div><div style="margin-bottom:24px;"><div style="font-size:12px;color:#64748B;font-weight:bold;">${t.invoices.to}:</div><div style="font-size:18px;font-weight:bold;">${est.client}</div></div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;"><thead><tr style="background:#0EA5E9;color:white;"><th style="padding:10px;text-align:left;">Service</th><th style="padding:10px;text-align:right;">Amount</th></tr></thead><tbody>${linesHtml}</tbody></table><div style="text-align:right;font-size:22px;font-weight:800;color:#0EA5E9;padding:14px;background:#E0F2FE;border-radius:8px;">${t.invoices.total}: $${parseFloat(est.total||0).toFixed(2)}</div>${notesHtml}<div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;color:#999;font-size:11px;">Generated by BrilloPro · © 2025 Avanza One LLC. All rights reserved.</div></body></html>`;
  win.document.write(html); win.document.close(); setTimeout(()=>win.print(),500);
};

// ─── ACCESS GATE ──────────────────────────────────────────────────────────────
function AccessGate({ onUnlock, t }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handleUnlock = () => {
    if (t.access.codes.includes(code.trim().toUpperCase())) { onUnlock(); }
    else { setError(true); setTimeout(()=>setError(false),2000); }
  };
  return (
    <div style={{minHeight:"100vh",background:C.black,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:C.white,borderRadius:20,padding:36,maxWidth:380,width:"100%",textAlign:"center",boxShadow:"0 8px 40px rgba(14,165,233,0.2)",borderTop:`4px solid ${C.blue}`}}>
        <div style={{marginBottom:20}}><img src={brilloLogo} alt="BrilloPro" style={{width:240,marginBottom:8}} /></div>
        <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8}}>{t.access.title}</div>
        <div style={{fontSize:13,color:C.grayDark,marginBottom:16}}>{t.access.subtitle}</div>
        <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleUnlock()} placeholder={t.access.placeholder} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`2px solid ${error?C.red:C.grayMid}`,fontSize:15,marginBottom:12,boxSizing:"border-box",outline:"none",textAlign:"center",letterSpacing:2}} />
        {error&&<div style={{color:C.red,fontSize:13,marginBottom:8}}>{t.access.error}</div>}
        <button onClick={handleUnlock} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:10,padding:"14px 0",fontSize:16,fontWeight:800,cursor:"pointer"}}>{t.access.btn}</button>
      </div>
    </div>
  );
}

// ─── SETUP SCREEN ─────────────────────────────────────────────────────────────
function SetupScreen({ onComplete, t, lang, setLang }) {
  const [form, setForm] = useState({companyName:"",ownerName:"",phone:"",email:"",address:"",payments:{check:{enabled:false,handle:""},cash:{enabled:false,handle:""},zelle:{enabled:false,handle:""},venmo:{enabled:false,handle:""},cashapp:{enabled:false,handle:""},creditCard:{enabled:false,handle:""}}});
  const togglePayment = (key) => setForm({...form,payments:{...form.payments,[key]:{...form.payments[key],enabled:!form.payments[key].enabled}}});
  const updatePaymentHandle = (key, val) => setForm({...form,payments:{...form.payments,[key]:{...form.payments[key],handle:val}}});
  return (
    <div style={{minHeight:"100vh",background:C.black,display:"flex",flexDirection:"column",alignItems:"center",padding:24,paddingTop:40}}>
      <div style={{position:"fixed",top:12,right:16,zIndex:99}}>
        <button onClick={()=>setLang(lang==="en"?"es":"en")} style={{background:"rgba(14,165,233,0.2)",color:C.white,border:"1px solid rgba(14,165,233,0.4)",borderRadius:20,padding:"6px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.lang}</button>
      </div>
      <div style={{background:C.white,borderRadius:16,padding:28,maxWidth:420,width:"100%",boxShadow:"0 8px 32px rgba(14,165,233,0.15)",borderTop:`4px solid ${C.blue}`,marginBottom:30}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <img src={brilloLogo} alt="BrilloPro" style={{width:130,marginBottom:10}} />
          <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>{t.setup.title}</div>
          <div style={{fontSize:13,color:C.grayDark}}>{t.setup.subtitle}</div>
        </div>
        {[["companyName",t.setup.companyName],["ownerName",t.setup.ownerName],["phone",t.setup.phone],["email",t.setup.email],["address",t.setup.address]].map(([key,label])=>(
          <input key={key} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={label} style={{width:"100%",padding:"11px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:10,boxSizing:"border-box"}} />
        ))}
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginTop:14,marginBottom:8}}>💳 {t.setup.payments}</div>
        {["check","cash","zelle","venmo","cashapp","creditCard"].map(key=>(
          <div key={key} style={{marginBottom:8}}>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"8px 10px",background:form.payments[key].enabled?C.bluePale:C.gray,borderRadius:6}}>
              <input type="checkbox" checked={form.payments[key].enabled} onChange={()=>togglePayment(key)} style={{width:16,height:16,accentColor:C.blue}} />
              <span style={{fontSize:13,fontWeight:600,color:C.text,flex:1}}>{t.billing[key]}</span>
            </label>
            {form.payments[key].enabled&&(key==="zelle"||key==="venmo"||key==="cashapp")&&(
              <input value={form.payments[key].handle} onChange={e=>updatePaymentHandle(key,e.target.value)} placeholder={t.billing.paymentHandle} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:12,marginTop:6,boxSizing:"border-box"}} />
            )}
          </div>
        ))}
        <button onClick={()=>onComplete(form)} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"13px 0",fontSize:15,fontWeight:800,cursor:"pointer",marginTop:14,marginBottom:8}}>{t.setup.continue}</button>
        <button onClick={()=>onComplete(form)} style={{width:"100%",background:"none",color:C.grayDark,border:"none",padding:"8px 0",fontSize:13,cursor:"pointer",textDecoration:"underline"}}>{t.setup.skip}</button>
      </div>
    </div>
  );
}

// ─── ROUTE TAB ────────────────────────────────────────────────────────────────
function RouteTab({ t, clients }) {
  const [stops, setStops] = useState(()=>load("bp_stops",[]));
  const [form, setForm] = useState({client:"",address:""});
  const [showForm, setShowForm] = useState(false);
  const [optimizedMsg, setOptimizedMsg] = useState(false);
  const [activeCrew, setActiveCrew] = useState("all"); // "all","1","2"
  useEffect(()=>{save("bp_stops",stops);},[stops]);

  const addStop = () => { if(!form.address) return; setStops([...stops,{...form,id:Date.now(),done:false,crew:activeCrew==="all"?"1":activeCrew}]); setForm({client:"",address:""}); setShowForm(false); };
  const startGPS = (address) => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving&dir_action=navigate`,"_blank");

  const todayDayIdx = ((new Date().getDay()+6)%7);
  const weekNum = (()=>{ const d=new Date(); const start=new Date(d.getFullYear(),0,1); return Math.ceil(((d-start)/86400000+start.getDay()+1)/7); })();
  const isWeekA = weekNum%2===1;

  const loadTodaysRoute = () => {
    const scheduled = clients.filter(c=>{
      if(!c.scheduleType||c.scheduleType==="oneTime") return false;
      if(!c.days||!c.days.includes(todayDayIdx)) return false;
      if(c.scheduleType==="weekly") return true;
      if(c.scheduleType==="biweeklyA"&&isWeekA) return true;
      if(c.scheduleType==="biweeklyB"&&!isWeekA) return true;
      return false;
    });
    if(scheduled.length===0){alert(t.route.noScheduled);return;}
    setStops(scheduled.map(c=>({id:Date.now()+Math.random(),client:c.name,address:c.address,done:false,crew:"1",accessType:c.accessType,locationType:c.locationType})));
  };

  const handleOptimize = () => { setStops(optimizeRoute(stops)); setOptimizedMsg(true); setTimeout(()=>setOptimizedMsg(false),2000); };
  const accessIcon = (type) => ({"Key":"🔑","Lockbox":"📦","Client Present":"🏠","Door Code":"🔢","Llave":"🔑","Caja de Llaves":"📦","Cliente Presente":"🏠","Código de Puerta":"🔢"})[type]||"";

  const filteredStops = activeCrew==="all" ? stops : stops.filter(s=>s.crew===activeCrew);
  const scheduled = stops.length;
  const completed = stops.filter(s=>s.done).length;
  const pending = stops.filter(s=>!s.done).length;

  return (
    <div style={{padding:16}}>
      {/* Crew Switcher */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["all",t.route.allCrew],["1",t.route.crew1],["2",t.route.crew2]].map(([val,label])=>(
          <button key={val} onClick={()=>setActiveCrew(val)} style={{flex:1,padding:"9px 4px",borderRadius:8,border:`2px solid ${activeCrew===val?C.blue:C.grayMid}`,background:activeCrew===val?C.blue:C.white,color:activeCrew===val?C.white:C.grayDark,fontWeight:700,fontSize:12,cursor:"pointer"}}>{label}</button>
        ))}
      </div>

      {/* Job Tracker */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        {[[t.route.scheduled,scheduled,C.blue],[t.route.completed,completed,C.green],[t.route.pending,pending,C.orange]].map(([label,val,color])=>(
          <div key={label} style={{background:C.white,borderRadius:10,padding:"10px 8px",textAlign:"center",border:`2px solid ${color}`}}>
            <div style={{fontSize:20,fontWeight:800,color}}>{val}</div>
            <div style={{fontSize:10,color:C.grayDark,fontWeight:600}}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{margin:0,color:C.blue,fontSize:18,fontWeight:800}}>{t.route.title}</h2>
        <button onClick={()=>setShowForm(!showForm)} style={{background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ {t.route.addStop}</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <button onClick={loadTodaysRoute} style={{flex:"1 1 auto",minWidth:140,background:C.black,color:C.white,border:`2px solid ${C.blue}`,borderRadius:8,padding:"10px 12px",fontWeight:700,cursor:"pointer",fontSize:13}}>📅 {t.route.loadToday}</button>
        {stops.length>1&&<button onClick={handleOptimize} style={{background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"10px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.route.optimize}</button>}
        {stops.length>0&&<button onClick={()=>setStops([])} style={{background:C.white,color:C.red,border:`2px solid ${C.red}`,borderRadius:8,padding:"10px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.route.clearRoute}</button>}
      </div>
      {optimizedMsg&&<div style={{textAlign:"center",color:C.blue,fontWeight:700,marginBottom:10}}>{t.route.optimized}</div>}

      {showForm&&(
        <div style={{background:C.bluePale,borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:C.grayDark,marginBottom:6}}>Assign to crew:</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            {[["1",t.route.crew1],["2",t.route.crew2]].map(([val,label])=>(
              <button key={val} onClick={()=>setActiveCrew(val)} style={{flex:1,padding:"7px",borderRadius:6,border:`2px solid ${(activeCrew===val||activeCrew==="all"&&val==="1")?C.blue:C.grayMid}`,background:(activeCrew===val)?C.blue:C.white,color:(activeCrew===val)?C.white:C.grayDark,fontWeight:700,fontSize:12,cursor:"pointer"}}>{label}</button>
            ))}
          </div>
          <select value={form.client} onChange={e=>{const c=clients.find(cl=>cl.name===e.target.value);setForm({client:e.target.value,address:c?c.address:form.address});}} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:10,boxSizing:"border-box"}}>
            <option value="">-- {t.route.client} --</option>
            {clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder={t.route.address} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:10,boxSizing:"border-box"}} />
          <button onClick={addStop} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer"}}>{t.route.addBtn}</button>
        </div>
      )}

      {filteredStops.length===0
        ?<div style={{textAlign:"center",color:C.grayDark,padding:"40px 16px",fontSize:14}}>{t.route.noStops}</div>
        :filteredStops.map((s,i)=>(
          <div key={s.id} style={{background:s.done?"#e2e8f0":C.white,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${s.crew==="2"?C.purple:C.grayMid}`}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="checkbox" checked={s.done} onChange={()=>setStops(stops.map(x=>x.id===s.id?{...x,done:!x.done}:x))} style={{width:20,height:20,accentColor:C.blue}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:s.done?C.grayDark:C.text,textDecoration:s.done?"line-through":"none",fontSize:14}}>
                  {t.route.stop} {i+1}{s.client?` — ${s.client}`:""}
                  <span style={{marginLeft:6,fontSize:10,background:s.crew==="2"?C.purple:C.blue,color:C.white,padding:"2px 6px",borderRadius:4}}>{s.crew==="2"?t.route.crew2:t.route.crew1}</span>
                  {s.locationType?<span style={{marginLeft:4,fontSize:10,background:C.bluePale,color:C.blue,padding:"2px 6px",borderRadius:4}}>{s.locationType}</span>:null}
                </div>
                <div style={{color:C.grayDark,fontSize:13}}>{s.address}</div>
                {s.accessType&&<div style={{fontSize:12,color:C.teal,marginTop:2}}>{accessIcon(s.accessType)} {s.accessType}</div>}
              </div>
              <button onClick={()=>startGPS(s.address)} style={{background:C.teal,color:C.white,border:"none",borderRadius:6,padding:"6px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>🚗 {t.route.navigate}</button>
              <button onClick={()=>setStops(stops.filter(x=>x.id!==s.id))} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"6px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.route.remove}</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ─── CLIENTS TAB ──────────────────────────────────────────────────────────────
function ClientsTab({ t, clients, setClients }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showLockbox, setShowLockbox] = useState(false);
  const [form, setForm] = useState({name:"",phone:"",address:"",email:"",scheduleType:"oneTime",days:[],accessType:"",lockboxCode:"",supplies:"",pets:"",preferredCleaner:"",locationType:"Residential",notes:""});
  const fileInputRef = useRef(null);

  const openAdd = () => { setEditingId(null); setForm({name:"",phone:"",address:"",email:"",scheduleType:"oneTime",days:[],accessType:"",lockboxCode:"",supplies:"",pets:"",preferredCleaner:"",locationType:"Residential",notes:""}); setShowForm(true); };
  const openEdit = (c) => { setEditingId(c.id); setForm({...c,days:c.days||[],scheduleType:c.scheduleType||"oneTime"}); setShowForm(true); };
  const toggleDay = (idx) => { const d=form.days.includes(idx)?form.days.filter(x=>x!==idx):[...form.days,idx].sort(); setForm({...form,days:d}); };
  const saveClient = () => {
    if(!form.name) return;
    if(editingId){setClients(clients.map(c=>c.id===editingId?{...form,id:editingId}:c));}
    else{setClients([...clients,{...form,id:Date.now()}]);}
    setShowForm(false); setEditingId(null);
  };
  const deleteClient = (id) => { if(window.confirm(t.clients.confirmDelete)) setClients(clients.filter(c=>c.id!==id)); };
  const scheduleLabel = (c) => {
    if(!c.scheduleType||c.scheduleType==="oneTime") return null;
    const days=(c.days||[]).map(d=>t.clients.days[d]).join(", "); if(!days) return null;
    const prefix=c.scheduleType==="weekly"?t.clients.weekly:c.scheduleType==="biweeklyA"?t.clients.biweeklyA:t.clients.biweeklyB;
    return `${prefix}: ${days}`;
  };
  const downloadTemplate = () => {
    const csv="Name,Phone,Address,Email,Schedule,Days\nMaria Lopez,555-1234,\"123 Oak St, Chicago IL\",maria@email.com,weekly,\"Mon,Wed,Fri\"\nJohn Smith,555-5678,\"456 Elm Ave, Chicago IL\",john@email.com,biweeklyA,Tue\n";
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a"); link.href=url; link.setAttribute("download","brillopro-client-template.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };
  const handleImport = (e) => {
    const file=e.target.files&&e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(evt)=>{
      try{
        const text=evt.target.result;
        const lines=text.split(/\r?\n/).filter(l=>l.trim().length>0);
        if(lines.length<2){alert(t.clients.importError);return;}
        const parseLine=(line)=>{const result=[];let cur="";let inQ=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(inQ&&line[i+1]==='"'){cur+='"';i++;}else{inQ=!inQ;}}else if(ch===","&&!inQ){result.push(cur.trim());cur="";}else{cur+=ch;}}result.push(cur.trim());return result;};
        const headers=parseLine(lines[0]).map(h=>h.toLowerCase());
        const idxName=headers.findIndex(h=>h.includes("name")),idxPhone=headers.findIndex(h=>h.includes("phone")),idxAddr=headers.findIndex(h=>h.includes("address")),idxEmail=headers.findIndex(h=>h.includes("email")),idxSched=headers.findIndex(h=>h.includes("schedule")),idxDays=headers.findIndex(h=>h.includes("day"));
        const dayMap={"mon":0,"tue":1,"wed":2,"thu":3,"fri":4,"sat":5,"sun":6,"lun":0,"mar":1,"mié":2,"mie":2,"jue":3,"vie":4,"sáb":5,"sab":5,"dom":6};
        const imported=[];
        for(let i=1;i<lines.length;i++){
          const fields=parseLine(lines[i]);const name=idxName>=0?fields[idxName]:"";if(!name) continue;
          const schedRaw=idxSched>=0?(fields[idxSched]||"").toLowerCase():"onetime";
          let scheduleType="oneTime";
          if(schedRaw.includes("weekly")&&!schedRaw.includes("biweekly"))scheduleType="weekly";
          else if(schedRaw.includes("biweeklya")||schedRaw==="a")scheduleType="biweeklyA";
          else if(schedRaw.includes("biweeklyb")||schedRaw==="b")scheduleType="biweeklyB";
          const daysRaw=idxDays>=0?(fields[idxDays]||""):"";
          const days=daysRaw.split(",").map(d=>dayMap[d.trim().toLowerCase().substring(0,3)]).filter(d=>d!==undefined);
          imported.push({id:Date.now()+Math.random(),name,phone:idxPhone>=0?fields[idxPhone]:"",address:idxAddr>=0?fields[idxAddr]:"",email:idxEmail>=0?fields[idxEmail]:"",scheduleType,days,locationType:"Residential"});
        }
        if(imported.length===0){alert(t.clients.importError);return;}
        setClients([...clients,...imported]);
        alert(`${imported.length} ${t.clients.importSuccess}`);
      }catch(err){alert(t.clients.importError);}
    };
    reader.readAsText(file); e.target.value="";
  };
  const selectStyle={width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:10,boxSizing:"border-box",background:C.white};
  const inputStyle={...selectStyle};

  return (
    <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h2 style={{margin:0,color:C.blue,fontSize:20,fontWeight:800}}>{t.clients.title}</h2>
        <button onClick={openAdd} style={{background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ {t.clients.addClient}</button>
      </div>
      <div style={{background:C.black,color:C.white,borderRadius:12,padding:14,marginBottom:14,borderLeft:`5px solid ${C.blue}`}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>📥 {t.clients.importTitle}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)",marginBottom:10,lineHeight:1.5}}>{t.clients.importBlurb}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={downloadTemplate} style={{flex:"1 1 auto",background:"transparent",color:C.white,border:`2px solid ${C.blue}`,borderRadius:8,padding:"9px 12px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.clients.downloadTemplate}</button>
          <button onClick={()=>fileInputRef.current&&fileInputRef.current.click()} style={{flex:"1 1 auto",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"10px 12px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.clients.import}</button>
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImport} style={{display:"none"}} />
        </div>
      </div>
      {showForm&&(
        <div style={{background:C.bluePale,borderRadius:12,padding:16,marginBottom:16}}>
          {[["name",t.clients.name],["phone",t.clients.phone],["address",t.clients.address],["email",t.clients.email]].map(([key,label])=>(
            <input key={key} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={label} style={inputStyle} />
          ))}
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>🏢 {t.clients.locationType}</div>
          <select value={form.locationType} onChange={e=>setForm({...form,locationType:e.target.value})} style={selectStyle}>
            {t.clients.locationTypes.map(lt=><option key={lt} value={lt}>{lt}</option>)}
          </select>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>🗓️ {t.clients.schedule}</div>
          <select value={form.scheduleType} onChange={e=>setForm({...form,scheduleType:e.target.value})} style={selectStyle}>
            <option value="oneTime">{t.clients.oneTime}</option>
            <option value="weekly">{t.clients.weekly}</option>
            <option value="biweeklyA">{t.clients.biweeklyA}</option>
            <option value="biweeklyB">{t.clients.biweeklyB}</option>
          </select>
          {form.scheduleType!=="oneTime"&&(
            <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
              {t.clients.days.map((day,idx)=>(
                <button key={day} onClick={()=>toggleDay(idx)} style={{flex:"1 1 auto",minWidth:42,padding:"8px 4px",borderRadius:6,border:`2px solid ${form.days.includes(idx)?C.blue:C.grayMid}`,background:form.days.includes(idx)?C.blue:C.white,color:form.days.includes(idx)?C.white:C.grayDark,fontWeight:700,fontSize:12,cursor:"pointer"}}>{day}</button>
              ))}
            </div>
          )}
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>🔑 {t.clients.access}</div>
          <select value={form.accessType} onChange={e=>setForm({...form,accessType:e.target.value})} style={selectStyle}>
            <option value="">-- Select --</option>
            {t.clients.accessTypes.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
          {(form.accessType==="Lockbox"||form.accessType==="Caja de Llaves")&&(
            <div style={{background:C.white,borderRadius:8,padding:10,marginBottom:10,border:`1px dashed ${C.blue}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.blue,marginBottom:6}}>📦 {t.clients.lockboxCode}</div>
              <div style={{display:"flex",gap:8}}>
                <input type={showLockbox?"text":"password"} value={form.lockboxCode} onChange={e=>setForm({...form,lockboxCode:e.target.value})} placeholder="0000" style={{flex:1,padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:14,boxSizing:"border-box"}} />
                <button onClick={()=>setShowLockbox(!showLockbox)} style={{background:C.blue,color:C.white,border:"none",borderRadius:6,padding:"0 12px",cursor:"pointer",fontSize:13}}>{showLockbox?"🙈":"👁️"}</button>
              </div>
            </div>
          )}
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>🧹 {t.clients.supplies}</div>
          <select value={form.supplies} onChange={e=>setForm({...form,supplies:e.target.value})} style={selectStyle}>
            <option value="">-- Select --</option>
            {t.clients.suppliesTypes.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>🐾 {t.clients.pets}</div>
          <select value={form.pets} onChange={e=>setForm({...form,pets:e.target.value})} style={selectStyle}>
            <option value="">-- Select --</option>
            {t.clients.petsTypes.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
          <input value={form.preferredCleaner} onChange={e=>setForm({...form,preferredCleaner:e.target.value})} placeholder={`👤 ${t.clients.preferredCleaner}`} style={inputStyle} />
          <textarea value={form.notes||""} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="📝 Notes / Notas" rows={3} style={{...inputStyle,resize:"vertical"}} />
          <button onClick={saveClient} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer"}}>{editingId?t.clients.update:t.clients.save}</button>
        </div>
      )}
      {clients.length===0
        ?<div style={{textAlign:"center",color:C.grayDark,padding:"40px 16px",fontSize:14}}>{t.clients.noClients}</div>
        :clients.map(c=>(
          <div key={c.id} style={{background:C.white,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.grayMid}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
              <div style={{fontWeight:700,fontSize:15,color:C.text}}>{c.name}</div>
              {c.locationType&&<span style={{fontSize:11,background:C.bluePale,color:C.blue,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{c.locationType}</span>}
            </div>
            <div style={{color:C.grayDark,fontSize:13,marginBottom:2}}>{c.phone}</div>
            <div style={{color:C.grayDark,fontSize:13,marginBottom:4}}>{c.address}</div>
            {scheduleLabel(c)&&<div style={{display:"inline-block",background:C.bluePale,color:C.blue,padding:"3px 8px",borderRadius:6,fontSize:11,fontWeight:700,marginBottom:6}}>📅 {scheduleLabel(c)}</div>}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
              {c.accessType&&<span style={{fontSize:11,background:"#f0fdf4",color:C.green,padding:"2px 8px",borderRadius:10,fontWeight:600}}>🔑 {c.accessType}</span>}
              {c.supplies&&<span style={{fontSize:11,background:"#fefce8",color:"#92400e",padding:"2px 8px",borderRadius:10,fontWeight:600}}>🧹 {c.supplies}</span>}
              {c.pets&&c.pets!=="No Pets"&&c.pets!=="Sin Mascotas"&&<span style={{fontSize:11,background:"#fdf2f8",color:"#9d174d",padding:"2px 8px",borderRadius:10,fontWeight:600}}>🐾 {c.pets}</span>}
              {c.preferredCleaner&&<span style={{fontSize:11,background:C.gray,color:C.grayDark,padding:"2px 8px",borderRadius:10,fontWeight:600}}>👤 {c.preferredCleaner}</span>}
            </div>
            {c.notes&&<div style={{color:C.grayDark,fontSize:12,marginBottom:8,fontStyle:"italic",borderLeft:`3px solid ${C.blueLight}`,paddingLeft:8}}>{c.notes}</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {c.phone&&<a href={`tel:${c.phone}`} style={{background:C.blue,color:C.white,borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:600,textDecoration:"none"}}>{t.clients.call}</a>}
              {c.address&&<a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" rel="noreferrer" style={{background:C.teal,color:C.white,borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:600,textDecoration:"none"}}>{t.clients.directions}</a>}
              <button onClick={()=>openEdit(c)} style={{background:C.orange,color:C.white,border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.clients.edit}</button>
              <button onClick={()=>deleteClient(c.id)} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.clients.delete}</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ─── INVOICES TAB ─────────────────────────────────────────────────────────────
function InvoicesTab({ t, clients, invoices, setInvoices, company }) {
  const [showForm, setShowForm] = useState(false);
  const emptyLine = () => ({service:"",amount:"",date:new Date().toISOString().split("T")[0],id:Date.now()+Math.random()});
  const [form, setForm] = useState({client:"",lines:[emptyLine()]});
  const addLine = () => setForm({...form,lines:[...form.lines,emptyLine()]});
  const removeLine = (id) => setForm({...form,lines:form.lines.filter(l=>l.id!==id)});
  const updateLine = (id,field,val) => setForm({...form,lines:form.lines.map(l=>l.id===id?{...l,[field]:val}:l)});
  const lineTotal = (lines) => lines.reduce((s,l)=>s+parseFloat(l.amount||0),0);
  const create = () => {
    if(!form.client) return;
    const validLines=form.lines.filter(l=>l.amount&&parseFloat(l.amount)>0);
    if(validLines.length===0) return;
    setInvoices([...invoices,{id:Date.now(),client:form.client,lines:validLines,total:lineTotal(validLines),status:"pending",date:new Date().toISOString().split("T")[0]}]);
    setForm({client:"",lines:[emptyLine()]}); setShowForm(false);
  };
  const total=invoices.reduce((s,i)=>s+parseFloat(i.total||0),0);
  const paid=invoices.filter(i=>i.status==="paid").reduce((s,i)=>s+parseFloat(i.total||0),0);
  return (
    <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{margin:0,color:C.blue,fontSize:20,fontWeight:800}}>{t.invoices.title}</h2>
        <button onClick={()=>setShowForm(!showForm)} style={{background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ {t.invoices.create}</button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <div style={{flex:1,background:C.bluePale,borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:11,color:C.grayDark,marginBottom:2}}>{t.invoices.total}</div>
          <div style={{fontSize:20,fontWeight:800,color:C.blue}}>${total.toFixed(2)}</div>
        </div>
        <div style={{flex:1,background:"#fef9c3",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:11,color:C.grayDark,marginBottom:2}}>{t.invoices.paid}</div>
          <div style={{fontSize:20,fontWeight:800,color:C.green}}>${paid.toFixed(2)}</div>
        </div>
      </div>
      {showForm&&(
        <div style={{background:C.bluePale,borderRadius:12,padding:16,marginBottom:16}}>
          <select value={form.client} onChange={e=>setForm({...form,client:e.target.value})} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:12,boxSizing:"border-box"}}>
            <option value="">-- {t.invoices.client} --</option>
            {clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <div style={{fontSize:12,fontWeight:700,color:C.grayDark,marginBottom:8}}>{t.invoices.lineItems}</div>
          {form.lines.map(line=>(
            <div key={line.id} style={{background:C.white,borderRadius:8,padding:10,marginBottom:8,border:`1px solid ${C.grayMid}`}}>
              <select value={line.service} onChange={e=>updateLine(line.id,"service",e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:13,marginBottom:6,boxSizing:"border-box"}}>
                <option value="">-- {t.invoices.service} --</option>
                {t.invoices.services.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <input value={line.date} onChange={e=>updateLine(line.id,"date",e.target.value)} type="date" style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:13,marginBottom:6,boxSizing:"border-box"}} />
              <input value={line.amount} onChange={e=>updateLine(line.id,"amount",e.target.value)} placeholder={t.invoices.amount} type="number" style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:13,marginBottom:6,boxSizing:"border-box"}} />
              {form.lines.length>1&&<button onClick={()=>removeLine(line.id)} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"6px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{t.invoices.removeLine}</button>}
            </div>
          ))}
          <button onClick={addLine} style={{width:"100%",background:C.white,color:C.blue,border:`2px dashed ${C.blue}`,borderRadius:8,padding:"10px 0",fontWeight:700,cursor:"pointer",marginBottom:10,fontSize:13}}>{t.invoices.addLine}</button>
          <div style={{background:C.white,padding:"10px 12px",borderRadius:8,marginBottom:10,textAlign:"right",fontWeight:700,color:C.blue,fontSize:15}}>{t.invoices.total}: ${lineTotal(form.lines).toFixed(2)}</div>
          <button onClick={create} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer"}}>{t.invoices.send}</button>
        </div>
      )}
      {invoices.length===0
        ?<div style={{textAlign:"center",color:C.grayDark,padding:"40px 16px",fontSize:14}}>{t.invoices.noInvoices}</div>
        :invoices.map(inv=>(
          <div key={inv.id} style={{background:C.white,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.grayMid}`}}>
            {company.companyName?(
              <div style={{borderBottom:`2px solid ${C.blue}`,paddingBottom:10,marginBottom:10}}>
                <div style={{fontWeight:800,fontSize:14,color:C.black}}>{company.companyName}</div>
                {company.ownerName&&<div style={{fontSize:11,color:C.grayDark}}>{company.ownerName}</div>}
                {company.phone&&<div style={{fontSize:11,color:C.grayDark}}>📞 {company.phone}</div>}
                {company.email&&<div style={{fontSize:11,color:C.grayDark}}>✉️ {company.email}</div>}
              </div>
            ):(
              <div style={{background:"#fef9c3",padding:"8px 10px",borderRadius:6,marginBottom:10,fontSize:11,color:"#92400e"}}>⚠️ {t.invoices.setup}</div>
            )}
            <div style={{fontSize:11,color:C.grayDark,fontWeight:600,marginBottom:2}}>{t.invoices.to}:</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontWeight:700,fontSize:15,color:C.text}}>{inv.client}</div>
              <div style={{fontSize:17,fontWeight:800,color:C.blue}}>${parseFloat(inv.total).toFixed(2)}</div>
            </div>
            {inv.lines&&inv.lines.map(l=>(
              <div key={l.id} style={{display:"flex",justifyContent:"space-between",color:C.grayDark,fontSize:13,marginBottom:3,paddingLeft:8,borderLeft:`2px solid ${C.blueLight}`}}>
                <div>{l.service} <span style={{fontSize:11}}>({formatDate(l.date)})</span></div>
                <div>${parseFloat(l.amount).toFixed(2)}</div>
              </div>
            ))}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
              <span style={{background:inv.status==="paid"?"#d1fae5":"#fef9c3",color:inv.status==="paid"?C.green:"#92400e",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600}}>{inv.status==="paid"?t.invoices.paid:t.invoices.pending}</span>
              {inv.status!=="paid"&&<button onClick={()=>setInvoices(invoices.map(x=>x.id===inv.id?{...x,status:"paid"}:x))} style={{background:C.green,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.invoices.markPaid}</button>}
              <button onClick={()=>printInvoice(inv,company,t)} style={{background:C.black,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.pdf}</button>
              <button onClick={()=>{const cl=clients.find(c=>c.name===inv.client);sendSMS(cl?cl.phone:"",formatInvoiceText(inv,company,t));}} style={{background:C.teal,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.invoices.textInv}</button>
              <button onClick={()=>{const cl=clients.find(c=>c.name===inv.client);sendEmail(cl?cl.email:"",`${t.invoices.invoiceNum} ${inv.id} — ${company.companyName||""}`,formatInvoiceText(inv,company,t));}} style={{background:C.orange,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.invoices.emailInv}</button>
              <button onClick={()=>{if(!company.googleReviewLink){alert(t.billing.reviewBlurb);return;}window.open(company.googleReviewLink,"_blank");}} style={{background:C.black,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>⭐ {t.invoices.review}</button>
              <button onClick={()=>{if(window.confirm(t.invoices.confirmDelInv))setInvoices(invoices.filter(x=>x.id!==inv.id));}} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.invoices.deleteInv}</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ─── ESTIMATES TAB ────────────────────────────────────────────────────────────
function EstimatesTab({ t, clients, estimates, setEstimates, invoices, setInvoices, company }) {
  const [showForm, setShowForm] = useState(false);
  const emptyLine = () => ({service:"",amount:"",id:Date.now()+Math.random()});
  const [form, setForm] = useState({client:"",lines:[emptyLine()],notes:""});
  const addLine = () => setForm({...form,lines:[...form.lines,emptyLine()]});
  const removeLine = (id) => setForm({...form,lines:form.lines.filter(l=>l.id!==id)});
  const updateLine = (id,field,val) => setForm({...form,lines:form.lines.map(l=>l.id===id?{...l,[field]:val}:l)});
  const lineTotal = (lines) => lines.reduce((s,l)=>s+parseFloat(l.amount||0),0);
  const saveEst = () => {
    if(!form.client) return;
    const validLines=form.lines.filter(l=>l.amount&&parseFloat(l.amount)>0);
    if(validLines.length===0) return;
    setEstimates([...estimates,{id:Date.now(),client:form.client,lines:validLines,notes:form.notes,total:lineTotal(validLines),status:"pending",date:new Date().toISOString().split("T")[0]}]);
    setForm({client:"",lines:[emptyLine()],notes:""}); setShowForm(false);
  };
  const convertToInvoice = (est) => {
    if(!window.confirm(t.estimates.convertConfirm)) return;
    setInvoices([...invoices,{id:Date.now(),client:est.client,lines:est.lines||[],total:est.total||0,status:"pending",date:new Date().toISOString().split("T")[0]}]);
    setEstimates(estimates.map(e=>e.id===est.id?{...e,status:"approved"}:e));
    alert(t.estimates.converted);
  };
  const formatEstText = (est) => {
    let text=company.companyName?`${company.companyName}\n`:"";
    if(company.phone) text+=`${company.phone}\n\n`;
    text+=`${t.estimates.title}\n${t.invoices.to}: ${est.client}\n\n`;
    if(est.lines) est.lines.forEach(l=>{text+=`• ${l.service} — $${parseFloat(l.amount).toFixed(2)}\n`;});
    text+=`\n${t.invoices.total}: $${parseFloat(est.total||0).toFixed(2)}\n`;
    if(est.notes) text+=`\nNotes: ${est.notes}\n`;
    return text;
  };
  return (
    <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:C.blue,fontSize:20,fontWeight:800}}>{t.estimates.title}</h2>
        <button onClick={()=>setShowForm(!showForm)} style={{background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ {t.estimates.create}</button>
      </div>
      {showForm&&(
        <div style={{background:C.bluePale,borderRadius:12,padding:16,marginBottom:16}}>
          <select value={form.client} onChange={e=>setForm({...form,client:e.target.value})} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:12,boxSizing:"border-box"}}>
            <option value="">-- {t.estimates.client} --</option>
            {clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          {form.lines.map(line=>(
            <div key={line.id} style={{background:C.white,borderRadius:8,padding:10,marginBottom:8,border:`1px solid ${C.grayMid}`}}>
              <select value={line.service} onChange={e=>updateLine(line.id,"service",e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:13,marginBottom:6,boxSizing:"border-box"}}>
                <option value="">-- {t.invoices.service} --</option>
                {t.invoices.services.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <input value={line.amount} onChange={e=>updateLine(line.id,"amount",e.target.value)} placeholder={t.estimates.amount} type="number" style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:13,marginBottom:6,boxSizing:"border-box"}} />
              {form.lines.length>1&&<button onClick={()=>removeLine(line.id)} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"6px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{t.invoices.removeLine}</button>}
            </div>
          ))}
          <button onClick={addLine} style={{width:"100%",background:C.white,color:C.blue,border:`2px dashed ${C.blue}`,borderRadius:8,padding:"10px 0",fontWeight:700,cursor:"pointer",marginBottom:10,fontSize:13}}>{t.invoices.addLine}</button>
          <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder={t.estimates.notes} rows={3} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:10,boxSizing:"border-box",resize:"vertical"}} />
          <div style={{background:C.white,padding:"10px 12px",borderRadius:8,marginBottom:10,textAlign:"right",fontWeight:700,color:C.blue,fontSize:15}}>{t.invoices.total}: ${lineTotal(form.lines).toFixed(2)}</div>
          <button onClick={saveEst} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer"}}>{t.estimates.save}</button>
        </div>
      )}
      {estimates.length===0
        ?<div style={{textAlign:"center",color:C.grayDark,padding:"40px 16px",fontSize:14}}>{t.estimates.noEstimates}</div>
        :estimates.map(est=>(
          <div key={est.id} style={{background:C.white,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.grayMid}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontWeight:700,fontSize:15,color:C.text}}>{est.client}</div>
              <div style={{fontSize:17,fontWeight:800,color:C.blue}}>${parseFloat(est.total||0).toFixed(2)}</div>
            </div>
            {est.lines&&est.lines.map(l=>(
              <div key={l.id} style={{display:"flex",justifyContent:"space-between",color:C.grayDark,fontSize:13,marginBottom:3,paddingLeft:8,borderLeft:`2px solid ${C.blueLight}`}}>
                <div>{l.service}</div><div>${parseFloat(l.amount).toFixed(2)}</div>
              </div>
            ))}
            {est.notes&&<div style={{color:C.grayDark,fontSize:12,marginTop:6,fontStyle:"italic"}}>{est.notes}</div>}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
              <span style={{background:est.status==="approved"?"#d1fae5":"#fef9c3",color:est.status==="approved"?C.green:"#92400e",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600}}>{est.status==="approved"?t.estimates.approved:t.estimates.pending}</span>
              {est.status!=="approved"&&<button onClick={()=>convertToInvoice(est)} style={{background:C.blue,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.estimates.convert}</button>}
              <button onClick={()=>printEstimate(est,company,t)} style={{background:C.black,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.pdf}</button>
              <button onClick={()=>{const cl=clients.find(c=>c.name===est.client);sendSMS(cl?cl.phone:"",formatEstText(est));}} style={{background:C.teal,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.estimates.textEst}</button>
              <button onClick={()=>{const cl=clients.find(c=>c.name===est.client);sendEmail(cl?cl.email:"",`${t.estimates.title} — ${company.companyName||""}`,formatEstText(est));}} style={{background:C.orange,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.estimates.emailEst}</button>
              <button onClick={()=>{if(window.confirm(t.estimates.confirmDelEst))setEstimates(estimates.filter(x=>x.id!==est.id));}} style={{background:C.red,color:C.white,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.estimates.deleteEst}</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ─── BILLING PIN GATE ─────────────────────────────────────────────────────────
function BillingPinGate({ t, onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const storedPin = load("bp_billing_pin","");
  const check = () => {
    if(!storedPin||pin===storedPin){onUnlock();}
    else{setError(true);setTimeout(()=>{setError(false);setPin("");},1500);}
  };
  return (
    <div style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:C.white,borderRadius:20,padding:32,maxWidth:320,width:"100%",textAlign:"center",boxShadow:"0 4px 24px rgba(14,165,233,0.15)",border:`2px solid ${C.blue}`}}>
        <div style={{fontSize:36,marginBottom:12}}>🔐</div>
        <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:6}}>{t.billing.billingPinEnter}</div>
        <input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} maxLength={4} placeholder="••••" style={{width:"100%",padding:"12px",borderRadius:10,border:`2px solid ${error?C.red:C.grayMid}`,fontSize:22,textAlign:"center",letterSpacing:8,marginBottom:12,boxSizing:"border-box",outline:"none"}} />
        {error&&<div style={{color:C.red,fontSize:13,marginBottom:8}}>{t.billing.billingPinWrong}</div>}
        <button onClick={check} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:10,padding:"13px 0",fontSize:15,fontWeight:800,cursor:"pointer"}}>Unlock 🔓</button>
      </div>
    </div>
  );
}

// ─── BILLING TAB ──────────────────────────────────────────────────────────────
function BillingTab({ t, invoices, estimates, company, setCompany, clients, setClients, setInvoices, setEstimates, billingUnlocked, setBillingUnlocked }) {
  const [form, setForm] = useState(company);
  const [showSaved, setShowSaved] = useState(false);
  const [backupMsg, setBackupMsg] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [showPinSet, setShowPinSet] = useState(false);
  const restoreRef = useRef(null);
  useEffect(()=>{setForm(company);},[company]);

  if(!billingUnlocked) return <BillingPinGate t={t} onUnlock={()=>setBillingUnlocked(true)} />;

  const total=invoices.reduce((s,i)=>s+parseFloat(i.total||0),0);
  const paid=invoices.filter(i=>i.status==="paid").reduce((s,i)=>s+parseFloat(i.total||0),0);
  const pending=total-paid;
  const thisMonth=invoices.filter(i=>{const d=new Date(i.date),n=new Date();return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear();}).reduce((s,i)=>s+parseFloat(i.total||0),0);

  const saveSettings = () => { setCompany(form); setShowSaved(true); setTimeout(()=>setShowSaved(false),2000); };
  const downloadCSV = (data,filename) => { const blob=new Blob([data],{type:"text/csv;charset=utf-8;"}); const url=URL.createObjectURL(blob); const link=document.createElement("a"); link.href=url; link.setAttribute("download",filename); document.body.appendChild(link); link.click(); document.body.removeChild(link); };
  const esc = (val) => { if(val===null||val===undefined)return""; const s=String(val); if(s.includes(",")||s.includes('"')||s.includes("\n"))return`"${s.replace(/"/g,'""')}"`; return s; };

  const exportInvoices = () => {
    if(!invoices||invoices.length===0){alert(t.billing.noData);return;}
    const headers=["Invoice Date","Client","Service","Amount","Status","Company"];
    const rows=[];
    invoices.forEach(inv=>{if(inv.lines&&inv.lines.length>0){inv.lines.forEach(l=>{rows.push([l.date||inv.date,inv.client,l.service,parseFloat(l.amount||0).toFixed(2),inv.status,company.companyName||""].map(esc).join(","));});}else{rows.push([inv.date,inv.client,"",parseFloat(inv.total||0).toFixed(2),inv.status,company.companyName||""].map(esc).join(","));}});
    downloadCSV([headers.join(","),...rows].join("\n"),`brillopro-invoices-${new Date().toISOString().split("T")[0]}.csv`);
  };
  const exportEstimates = () => {
    if(!estimates||estimates.length===0){alert(t.billing.noData);return;}
    const headers=["Estimate Date","Client","Service","Amount","Status","Notes","Company"];
    const rows=[];
    estimates.forEach(est=>{if(est.lines&&est.lines.length>0){est.lines.forEach(l=>{rows.push([est.date||"",est.client,l.service,parseFloat(l.amount||0).toFixed(2),est.status,est.notes||"",company.companyName||""].map(esc).join(","));});}else{rows.push([est.date||"",est.client,"",parseFloat(est.total||0).toFixed(2),est.status,est.notes||"",company.companyName||""].map(esc).join(","));}});
    downloadCSV([headers.join(","),...rows].join("\n"),`brillopro-estimates-${new Date().toISOString().split("T")[0]}.csv`);
  };
  const handleBackup = () => {
    const data={version:"1.0",exported:new Date().toISOString(),clients,invoices,estimates,company};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a"); link.href=url; link.download=`brillopro-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setBackupMsg(t.billing.backupSuccess); setTimeout(()=>setBackupMsg(""),2500);
  };
  const handleRestore = (e) => {
    const file=e.target.files&&e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(evt)=>{
      try{
        const data=JSON.parse(evt.target.result);
        if(data.clients) setClients(data.clients);
        if(data.invoices) setInvoices(data.invoices);
        if(data.estimates) setEstimates(data.estimates);
        if(data.company){setCompany(data.company);setForm(data.company);}
        setBackupMsg(t.billing.restoreSuccess); setTimeout(()=>setBackupMsg(""),2500);
      }catch(err){alert(t.billing.restoreError);}
    };
    reader.readAsText(file); e.target.value="";
  };

  const sectionHead = (icon,label,color=C.blue) => (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,paddingBottom:8,borderBottom:`2px solid ${color}`}}>
      <span style={{fontSize:18}}>{icon}</span>
      <span style={{fontSize:15,fontWeight:800,color:C.text}}>{label}</span>
    </div>
  );

  return (
    <div style={{padding:16}}>
      {/* Lock button */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:C.blue,fontSize:20,fontWeight:800}}>{t.billing.title}</h2>
        <button onClick={()=>setBillingUnlocked(false)} style={{background:"transparent",color:C.grayDark,border:`1px solid ${C.grayMid}`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>🔒 {t.billing.billingPinLock}</button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        {[[t.billing.totalEarned,`$${paid.toFixed(2)}`,C.green],[t.billing.totalPending,`$${pending.toFixed(2)}`,C.orange],[t.billing.thisMonth,`$${thisMonth.toFixed(2)}`,C.blue],["Total Invoices",`${invoices.length}`,C.grayDark]].map(([label,val,color])=>(
          <div key={label} style={{background:C.white,border:`1px solid ${C.grayMid}`,borderRadius:12,padding:14,textAlign:"center"}}>
            <div style={{fontSize:11,color:C.grayDark,marginBottom:4}}>{label}</div>
            <div style={{fontSize:22,fontWeight:800,color}}>{val}</div>
          </div>
        ))}
      </div>

      {/* ── SECTION: Company Settings ── */}
      <div style={{background:C.white,borderRadius:12,padding:16,marginBottom:16,border:`2px solid ${C.blue}`}}>
        {sectionHead("🏢",t.billing.settings)}
        {[["companyName",t.billing.companyName],["ownerName",t.billing.ownerName],["phone",t.billing.phone],["email",t.billing.email],["address",t.billing.address],["license",t.billing.license]].map(([key,label])=>(
          <input key={key} value={form[key]||""} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={label} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:14,marginBottom:8,boxSizing:"border-box"}} />
        ))}
        {/* Payment Methods */}
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8,marginTop:4}}>💳 {t.billing.paymentsTitle}</div>
        <div style={{fontSize:12,color:C.grayDark,marginBottom:10}}>{t.billing.paymentsBlurb}</div>
        {["check","cash","zelle","venmo","cashapp","creditCard"].map(key=>{
          const p=(form.payments&&form.payments[key])||{enabled:false,handle:""};
          const toggle=()=>setForm({...form,payments:{...(form.payments||{}),[key]:{...p,enabled:!p.enabled}}});
          const updateHandle=(val)=>setForm({...form,payments:{...(form.payments||{}),[key]:{...p,handle:val}}});
          return(
            <div key={key} style={{marginBottom:8}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"8px 10px",background:p.enabled?C.bluePale:C.gray,borderRadius:6}}>
                <input type="checkbox" checked={p.enabled} onChange={toggle} style={{width:16,height:16,accentColor:C.blue}} />
                <span style={{fontSize:13,fontWeight:600,color:C.text,flex:1}}>{t.billing[key]}</span>
              </label>
              {p.enabled&&(key==="zelle"||key==="venmo"||key==="cashapp")&&(
                <input value={p.handle||""} onChange={e=>updateHandle(e.target.value)} placeholder={t.billing.paymentHandle} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grayMid}`,fontSize:12,marginTop:6,boxSizing:"border-box"}} />
              )}
            </div>
          );
        })}
        {/* Google Review */}
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6,marginTop:8}}>⭐ {t.billing.reviewTitle}</div>
        <div style={{fontSize:12,color:C.grayDark,marginBottom:8}}>{t.billing.reviewBlurb}</div>
        <input value={form.googleReviewLink||""} onChange={e=>setForm({...form,googleReviewLink:e.target.value})} placeholder={t.billing.reviewPlaceholder} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:13,boxSizing:"border-box",marginBottom:12}} />
        <button onClick={saveSettings} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer"}}>{t.billing.saveSettings}</button>
        {showSaved&&<div style={{textAlign:"center",color:C.blue,fontWeight:700,marginTop:8,fontSize:13}}>✓ {t.billing.saved}</div>}
      </div>

      {/* ── SECTION: Billing PIN ── */}
      <div style={{background:C.white,borderRadius:12,padding:16,marginBottom:16,border:`2px solid ${C.purple}`}}>
        {sectionHead("🔐",t.billing.billingPin,C.purple)}
        <div style={{fontSize:12,color:C.grayDark,marginBottom:12}}>{t.billing.billingPinSet}</div>
        <div style={{display:"flex",gap:8}}>
          <input type="password" value={pinInput} onChange={e=>setPinInput(e.target.value)} maxLength={4} placeholder="New PIN (4 digits)" style={{flex:1,padding:"10px 12px",borderRadius:8,border:`1px solid ${C.grayMid}`,fontSize:16,textAlign:"center",letterSpacing:6,boxSizing:"border-box"}} />
          <button onClick={()=>{if(pinInput.length===4){save("bp_billing_pin",pinInput);setPinInput("");setShowPinSet(true);setTimeout(()=>setShowPinSet(false),2000);}}} style={{background:C.purple,color:C.white,border:"none",borderRadius:8,padding:"0 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.billing.billingPinSave}</button>
        </div>
        {showPinSet&&<div style={{textAlign:"center",color:C.purple,fontWeight:700,marginTop:8,fontSize:13}}>✓ PIN saved!</div>}
      </div>

      {/* ── SECTION: Backup & Restore ── */}
      <div style={{background:C.black,color:C.white,borderRadius:12,padding:16,marginBottom:16,borderLeft:`5px solid ${C.green}`}}>
        {sectionHead("💾","Data Backup & Restore",C.green)}
        <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginBottom:14,lineHeight:1.5}}>Download a full backup of all clients, invoices, estimates, and settings. Restore anytime.</div>
        <button onClick={handleBackup} style={{width:"100%",background:C.green,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer",fontSize:14,marginBottom:8}}>{t.billing.backup}</button>
        <button onClick={()=>restoreRef.current&&restoreRef.current.click()} style={{width:"100%",background:"transparent",color:C.white,border:`2px solid ${C.green}`,borderRadius:8,padding:"10px 0",fontWeight:700,cursor:"pointer",fontSize:14}}>{t.billing.restore}</button>
        <input ref={restoreRef} type="file" accept=".json,application/json" onChange={handleRestore} style={{display:"none"}} />
        {backupMsg&&<div style={{textAlign:"center",color:C.green,fontWeight:700,marginTop:10,fontSize:13}}>{backupMsg}</div>}
      </div>

      {/* ── SECTION: Accounting Export ── */}
      <div style={{background:C.black,color:C.white,borderRadius:12,padding:16,marginBottom:16,borderLeft:`5px solid ${C.blue}`}}>
        {sectionHead("📊",t.billing.exportTitle,C.blue)}
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)",marginBottom:14,lineHeight:1.5}}>{t.billing.exportBlurb}</div>
        <button onClick={exportInvoices} style={{width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:8,padding:"11px 0",fontWeight:700,cursor:"pointer",marginBottom:8,fontSize:14}}>{t.billing.export}</button>
        <button onClick={exportEstimates} style={{width:"100%",background:"transparent",color:C.white,border:`2px solid ${C.blue}`,borderRadius:8,padding:"10px 0",fontWeight:700,cursor:"pointer",fontSize:14}}>{t.billing.exportEstimates}</button>
      </div>

      {/* ── SECTION: Subscription ── */}
      <div style={{background:C.bluePale,borderRadius:12,padding:16}}>
        {sectionHead("💰",t.billing.plan,C.blue)}
        <div style={{fontWeight:800,fontSize:18,color:C.blue,marginBottom:4}}>{t.billing.monthly}</div>
        <div style={{fontSize:13,color:C.grayDark}}>{t.billing.annual} — save $100/year</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(()=>load("bp_lang","en"));
  const [unlocked, setUnlocked] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState(()=>load("bp_clients",[]));
  const [invoices, setInvoices] = useState(()=>load("bp_invoices",[]));
  const [estimates, setEstimates] = useState(()=>load("bp_estimates",[]));
  const [company, setCompany] = useState(()=>load("bp_company",{companyName:"",ownerName:"",phone:"",email:"",address:"",license:"",payments:{check:{enabled:false,handle:""},cash:{enabled:false,handle:""},zelle:{enabled:false,handle:""},venmo:{enabled:false,handle:""},cashapp:{enabled:false,handle:""},creditCard:{enabled:false,handle:""}}}));
  const [billingUnlocked, setBillingUnlocked] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(()=>{if(load("bp_unlocked",false))setUnlocked(true);if(load("bp_setup_done",false))setSetupDone(true);},[]);
  useEffect(()=>{save("bp_lang",lang);},[lang]);
  useEffect(()=>{save("bp_clients",clients);},[clients]);
  useEffect(()=>{save("bp_invoices",invoices);},[invoices]);
  useEffect(()=>{save("bp_estimates",estimates);},[estimates]);
  useEffect(()=>{save("bp_company",company);},[company]);

  // Lock billing when switching away
  useEffect(()=>{ if(activeTab!==4) setBillingUnlocked(false); },[activeTab]);

  const handleUnlock = () => { setUnlocked(true); save("bp_unlocked",true); };
  const handleSetupComplete = (info) => { setCompany(info); setSetupDone(true); save("bp_setup_done",true); };

  if(!unlocked) return (
    <div>
      <div style={{position:"fixed",top:12,right:16,zIndex:99}}>
        <button onClick={()=>setLang(lang==="en"?"es":"en")} style={{background:"rgba(14,165,233,0.2)",color:C.white,border:"1px solid rgba(14,165,233,0.4)",borderRadius:20,padding:"6px 14px",fontWeight:700,cursor:"pointer",fontSize:13}}>{t.lang}</button>
      </div>
      <AccessGate onUnlock={handleUnlock} t={t} />
    </div>
  );

  if(!setupDone) return <SetupScreen onComplete={handleSetupComplete} t={t} lang={lang} setLang={setLang} />;

  const TAB_ICONS = ["🗺️","👥","📄","📋","💰"];

  return (
    <div style={{maxWidth:1100,margin:"0 auto",minHeight:"100vh",background:C.gray,fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",paddingBottom:90}}>
      {/* Header */}
      <div style={{background:C.black,position:"sticky",top:0,zIndex:10,borderBottom:`3px solid ${C.blue}`}}>
         <img src={brilloHeader} alt="BrilloPro" style={{width:"100%",height:"auto",display:"block",maxHeight:"110px",objectFit:"cover",objectPosition:"center"}} />
        <div style={{background:C.black,padding:"5px 12px",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
          <button onClick={()=>setLang(lang==="en"?"es":"en")} style={{background:"rgba(14,165,233,0.2)",color:C.white,border:`1px solid ${C.blue}`,borderRadius:20,padding:"5px 14px",fontWeight:700,cursor:"pointer",fontSize:12}}>{t.lang}</button>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab===0&&<RouteTab t={t} clients={clients} />}
        {activeTab===1&&<ClientsTab t={t} clients={clients} setClients={setClients} />}
        {activeTab===2&&<InvoicesTab t={t} clients={clients} invoices={invoices} setInvoices={setInvoices} company={company} />}
        {activeTab===3&&<EstimatesTab t={t} clients={clients} estimates={estimates} setEstimates={setEstimates} invoices={invoices} setInvoices={setInvoices} company={company} />}
        {activeTab===4&&<BillingTab t={t} invoices={invoices} estimates={estimates} company={company} setCompany={setCompany} clients={clients} setClients={setClients} setInvoices={setInvoices} setEstimates={setEstimates} billingUnlocked={billingUnlocked} setBillingUnlocked={setBillingUnlocked} />}
      </div>

      {/* Bottom nav — bigger icons */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:1100,background:C.black,borderTop:`3px solid ${C.blue}`,zIndex:10}}>
        <div style={{display:"flex"}}>
          {t.tabs.map((tab,i)=>(
            <button key={tab} onClick={()=>setActiveTab(i)} style={{flex:1,padding:"10px 0 8px",background:"none",border:"none",color:activeTab===i?C.blue:"rgba(255,255,255,0.5)",fontWeight:activeTab===i?800:500,cursor:"pointer",borderTop:activeTab===i?`2px solid ${C.blue}`:"2px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <span style={{fontSize:22}}>{TAB_ICONS[i]}</span>
              <span style={{fontSize:10}}>{tab}</span>
            </button>
          ))}
        </div>
        <div style={{textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:9,padding:"2px 0 4px",letterSpacing:0.3}}>
          © 2025 Avanza One LLC. All rights reserved.
        </div>
      </div>
    </div>
  );
}
